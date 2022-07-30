
function _export_one_image($svgPath, $exportPathPrefix, $size)
{
    $exportFilePath="$exportPathPrefix-$size.png"
    Write-Host ""
    Write-Host "inkscape ""$svgPath"" --actions=""export-type:png;export-area-page;export-width:$size;export-height:$size;export-overwrite;export-filename:$exportFilePath;export-do"""
    inkscape "$svgPath" --actions="export-type:png;export-area-page;export-width:$size;export-height:$size;export-overwrite;export-filename:$exportFilePath;export-do"
}

function _export_one_svg($folder, $name)
{
    Write-Host ""
    Write-Host "------------------------------"
    Write-Host ""
    Write-Host "Export $folder / $name"
    Write-Host ""

    $exportFolder = Join-Path "$PSScriptRoot" "$folder"
    $svgPath = Join-Path "$exportFolder" "$name.svg"
    $exportPathPrefix = Join-Path "$exportFolder" "$name"

    _export_one_image "$svgPath" "$exportPathPrefix" 128
    _export_one_image "$svgPath" "$exportPathPrefix" 64
    _export_one_image "$svgPath" "$exportPathPrefix" 32
    _export_one_image "$svgPath" "$exportPathPrefix" 16
}

_export_one_svg "light" "unmuted"
_export_one_svg "light" "muted"
_export_one_svg "dark" "unmuted"
_export_one_svg "dark" "muted"
