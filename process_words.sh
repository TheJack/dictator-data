for file in `ls googlebooks-eng-all*`; do
  if [ -f extracted-`basename $file .gz` ]; then
    echo 'Skippping already extracted file ' $file
    continue;
  fi
  echo 'unzipping file ' $file
  gunzip < $file > extracted-`basename $file .gz`
done
