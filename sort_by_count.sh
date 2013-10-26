for file in `ls reduced*`; do
  if [ -f sorted-$file ]; then
    echo 'Skipping already sorted file' $file
    continue
  fi
  echo 'Sorting file ' $file
  awk '{print $NF,$0}' $file | sort -g -r | cut -f2- -d ' ' > sorted-$file
done


