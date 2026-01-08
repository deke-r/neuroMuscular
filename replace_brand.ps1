$ErrorActionPreference = "Stop"

# Replace in all client JSX files
Get-ChildItem -Path "c:\projectsBhavishya\neuromuscular\client\src" -Recurse -Include *.jsx,*.js | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'musculoneurorehab') {
        $content -replace 'musculoneurorehab', 'MuscloNeuroRehab' | Set-Content $_.FullName -NoNewline
        Write-Host "Updated: $($_.FullName)"
    }
}

# Replace in all server files
Get-ChildItem -Path "c:\projectsBhavishya\neuromuscular\server" -Recurse -Include *.js,*.md | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    if ($content -match 'musculoneurorehab') {
        $content -replace 'musculoneurorehab', 'MuscloNeuroRehab' | Set-Content $_.FullName -NoNewline
        Write-Host "Updated: $($_.FullName)"
    }
}

# Replace in specific files
$specificFiles = @(
    "c:\projectsBhavishya\neuromuscular\client\public\robots.txt",
    "c:\projectsBhavishya\neuromuscular\CLIENT_INFORMATION_FORM.md"
)

foreach ($file in $specificFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match 'musculoneurorehab') {
            $content -replace 'musculoneurorehab', 'MuscloNeuroRehab' | Set-Content $file -NoNewline
            Write-Host "Updated: $file"
        }
    }
}

Write-Host "Replacement complete!"
