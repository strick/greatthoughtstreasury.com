for i in {0..2}
do
    RES=$(curl -s https://greatthoughtstreasury.com/quotes/$i)

    echo $RES

done