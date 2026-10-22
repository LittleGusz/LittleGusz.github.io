@echo off
rem =====================================================================
rem  BUAT PDF PORTOFOLIO - cukup dobel-klik file ini.
rem  Isi PDF diambil dari js\data.js (sama dengan website), lalu dicetak
rem  pakai Microsoft Edge bawaan Windows. Tidak butuh internet.
rem  Hasilnya ditaruh di assets\portfolio\. Kalau nama file di bawah
rem  diganti, ganti juga path "portfolio" di js\data.js.
rem =====================================================================
setlocal
set "PDF_ID=Portofolio-Muhamad-Agus-Firdaus.pdf"
set "PDF_EN=Portfolio-Muhamad-Agus-Firdaus-EN.pdf"

cd /d "%~dp0.."
set "ROOT=%cd%"
set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" (
  echo Microsoft Edge tidak ditemukan.
  echo Cara manual: buka pdf-portofolio\index.html di Chrome atau Edge, tekan Ctrl+P, pilih Simpan sebagai PDF.
  goto selesai
)
if not exist "assets\portfolio" mkdir "assets\portfolio"

rem alamat file:/// untuk halaman cetak; spasi di nama folder diubah jadi %20
set "URL=file:///%ROOT:\=/%/pdf-portofolio/index.html"
setlocal EnableDelayedExpansion
set "URL=!URL: =%%20!"
endlocal & set "URL=%URL%"

call :cetak id "%PDF_ID%"
call :cetak en "%PDF_EN%"
rem profil Edge sementara dihapus lagi
rd /s /q "%TEMP%\pdf-portofolio-edge" 2>nul
echo.
echo Selesai. PDF-nya ada di folder assets\portfolio\
goto selesai

:cetak
echo Membuat assets\portfolio\%~2 ...
"%EDGE%" --headless=new --disable-gpu --disable-sync --log-level=3 --no-first-run --no-default-browser-check --no-pdf-header-footer --allow-file-access-from-files --virtual-time-budget=30000 --user-data-dir="%TEMP%\pdf-portofolio-edge" --print-to-pdf="%ROOT%\assets\portfolio\%~2" "%URL%?lang=%~1"
exit /b

:selesai
rem "nopause" dipakai kalau dijalankan dari program lain (tanpa jendela yang perlu ditahan)
if /i not "%~1"=="nopause" pause
endlocal
