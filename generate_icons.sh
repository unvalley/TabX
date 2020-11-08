#!/bin/bash

for size in 16 48 128
do
  convert tabX.png -resize ${size}x  -unsharp 1.5x1+0.7+0.02 src/assets/icons/${size}.png
done
