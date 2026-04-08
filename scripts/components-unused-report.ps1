param(
  [string]$Root = "C:\Cursor\the_redesign_html"
)

$components = Join-Path $Root "components"
$archiveDir = Join-Path $components "_unused_archive"
$reportPath = Join-Path $components "_unused_report.txt"

# Collect all code files (exclude anything inside components/)
$codeFiles = Get-ChildItem -Path $Root -Recurse -File -Include *.html, *.css, *.js |
  Where-Object { $_.FullName -notmatch "\\components\\" }

$codeText = ($codeFiles | ForEach-Object {
  Get-Content -LiteralPath $_.FullName -Raw -ErrorAction SilentlyContinue
}) -join "`n"

if (!(Test-Path $archiveDir)) {
  New-Item -ItemType Directory -Path $archiveDir | Out-Null
}

# Collect all component files (exclude existing archive)
$componentFiles = Get-ChildItem -Path $components -Recurse -File |
  Where-Object { $_.FullName -notmatch "\\_unused_archive\\" } |
  Where-Object { $_.Name -ne "_unused_report.txt" }

$results = foreach ($f in $componentFiles) {
  $rel = $f.FullName.Substring($Root.Length + 1).Replace("\", "/")
  [pscustomobject]@{
    rel   = $rel
    used  = ($codeText -like ("*" + $rel + "*"))
    bytes = $f.Length
  }
}

$used = $results | Where-Object used | Sort-Object rel
$unused = @($results | Where-Object { -not $_.used } | Sort-Object rel)

"TOTAL: $($results.Count)" | Out-File -Encoding utf8 $reportPath
"USED: $($used.Count)" | Out-File -Encoding utf8 -Append $reportPath
"UNUSED: $($unused.Count)" | Out-File -Encoding utf8 -Append $reportPath
"" | Out-File -Encoding utf8 -Append $reportPath
"UNUSED FILES:" | Out-File -Encoding utf8 -Append $reportPath
$unused.rel | Out-File -Encoding utf8 -Append $reportPath
"" | Out-File -Encoding utf8 -Append $reportPath
"USED FILES:" | Out-File -Encoding utf8 -Append $reportPath
$used.rel | Out-File -Encoding utf8 -Append $reportPath

Write-Host "Wrote report to $reportPath"
Write-Host ("Unused count: " + $unused.Count)

