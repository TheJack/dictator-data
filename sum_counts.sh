for file in `ls alphabetic*`; do
  if [ -f reduced-$file ]; then
    echo 'Skipping already filtered file' $file
    continue
  fi
  echo 'Summing counts for file ' $file
  ./sum_counts $file
done

