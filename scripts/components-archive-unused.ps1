param(
  [string]$Root = "C:\Cursor\the_redesign_html"
)

$report = Join-Path $Root "components\_unused_report.txt"
$archive = Join-Path $Root "components\_unused_archive"

if (!(Test-Path $report)) {
  throw "Report not found: $report. Run scripts/components-unused-report.ps1 first."
}

if (!(Test-Path $archive)) {
  New-Item -ItemType Directory -Path $archive | Out-Null
}

$lines = Get-Content -LiteralPath $report
$unusedStart = [Array]::IndexOf($lines, "UNUSED FILES:") + 1
$usedStart = [Array]::IndexOf($lines, "USED FILES:")

if ($unusedStart -le 0 -or $usedStart -le 0 -or $usedStart -le $unusedStart) {
  throw "Unable to parse unused list from report: $report"
}

$unused = $lines[$unusedStart..($usedStart - 1)] | Where-Object { $_ -and $_.Trim() -ne "" }

$moved = 0
foreach ($rel in $unused) {
  $src = Join-Path $Root ($rel.Replace("/", "\"))
  $dst = Join-Path $archive ($rel -replace "^components/", "")
  $dstDir = Split-Path -Parent $dst
  if (!(Test-Path $dstDir)) {
    New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
  }
  if (Test-Path $src) {
    Move-Item -LiteralPath $src -Destination $dst -Force
    $moved++
  }
}

Write-Host ("Moved {0} files to {1}" -f $moved, $archive)

