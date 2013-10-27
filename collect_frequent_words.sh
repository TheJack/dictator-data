min_count=$1
if [ -z $min_count ]; then
  echo 'Not enough arguments passed.'
  echo "Usage: `basename $0` min_count"
  exit -1
fi
rm frequent_words.txt
for file in `ls reduced*`; do
  echo 'processing file' $file
  awk -v count=$min_count '$NF > count' $file >> frequent_words.txt
done
