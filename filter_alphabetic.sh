for file in `ls extracted*`; do
  if [ -f alphabetic-$file ]; then
    echo 'Skipping already filtered file' $file
    continue
  fi
  echo 'Filtering file ' $file
  time egrep '^[a-zA-Z]+\t' $file > alphabetic-$file
done
