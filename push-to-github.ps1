$username = Read-Host "Enter your GitHub username"
$token = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString
$tokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToCoTaskMemUnicode($token))

$remoteUrl = "https://${username}:${tokenPlain}@github.com/AbstractEmporiumArt/AbstractEmporiumArt.git"

Write-Host "`nConfiguring Git remote..." -ForegroundColor Cyan
git remote set-url origin $remoteUrl

Write-Host "Pushing code to GitHub..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Success! Your code has been pushed to GitHub." -ForegroundColor Green
    Write-Host "Repository: https://github.com/AbstractEmporiumArt/AbstractEmporiumArt" -ForegroundColor Green
} else {
    Write-Host "`n❌ Push failed. Please check your credentials." -ForegroundColor Red
}
