param(
  [string]$Root = "C:\Cursor\the_redesign_html"
)

$source = Join-Path $Root "service-detail.html"
$slugs = @(
  "website-designing-agency-in-bangalore",
  "seo-company-in-bangalore",
  "orm-services-in-bangalore",
  "social-media-optimization-services-bangalore",
  "search-engine-marketing-agency-bangalore",
  "social-media-marketing-company-in-bangalore",
  "branding-rebranding-agency-bangalore",
  "display-advertising-agency-bangalore",
  "ecommerce-marketing-agency-bangalore",
  "pr-and-marketing-agency-bangalore",
  "software-development-company-bangalore",
  "api-integration-services-bangalore",
  "email-marketing-company-in-bangalore",
  "sms-marketing-company-in-bangalore",
  "whatsapp-marketing-services-bangalore",
  "shopify-website-development-services-in-bangalore"
)

foreach ($slug in $slugs) {
  $dest = Join-Path $Root ($slug + ".html")
  Copy-Item -LiteralPath $source -Destination $dest -Force
}

Write-Host ("Created/updated {0} SEO slug pages" -f $slugs.Count)

