import Rio from "@/src/components/Code/Rio";
import TagContainer from "@/src/components/TagContainer/TagContainer";
import { Bash } from "@/src/utils/projectstags";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-normal text-center text-7xl min-h-28">Bash Scripts Menu</h2>
      <h2 className="font-semibold text-gray-500 text-center text-xl min-h-28">2022</h2>
      <div className="">
        <p className="mb-3 text-sm text-right ">2-minute read</p>
        <TagContainer tags={Bash} />
      </div>
      <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12 text-justify">

        <p className="my-3">This project consists of a set of Bash scripts that perform various text analysis operations on a predetermined text. The scripts are packaged into a Docker image for easy execution. </p>
        <h1 className="text-2xl font-bold my-3 ">Project Structure</h1>
        <ol className="flex flex-col gap-3">
          <li className="text-xl font-bold my-2 flex items-center"><ArrowRight />menu.sh</li>
          <p>Provides a user interface to access different functions</p>
          <Rio code={`#!/usr/bin/env bash

TEXT_FILE="texto.txt"

if [ ! -f "$TEXT_FILE" ]; then
    echo "Error: File '$TEXT_FILE' not found."
    exit 1
fi

run_script() {
    if [ -f "$1" ]; then
        bash "$1" "$TEXT_FILE"
    else
        echo "Error: Script '$1' not found."
    fi
}

while true; do
    echo -e "\nText Analysis Menu"
    echo "-------------------"
    echo "1. Analyze Word Statistics"
    echo "2. Analyze Word Usage"
    echo "3. Find Names"
    echo "4. Analyze Sentence Statistics"
    echo "5. Count Blank Lines"
    echo "6. Exit"
    
    read -p "Select an option (1-6): " choice
    
    case $choice in
        1) run_script "statsWords.sh" ;;
        2) run_script "statsUsageWords.sh" ;;
        3) run_script "findNames.sh" ;;
        4) run_script "statsSentences.sh" ;;
        5) run_script "blankLinesCounter.sh" ;;
        6) echo "Exiting program. Goodbye!"; exit 0 ;;
        *) echo "Invalid option. Please choose a number between 1 and 6." ;;
    esac
    
    echo -e "\nPress Enter to continue..."
    read
done`} language={"bash"} showLineNumbers={true} />

          <li className="text-xl font-bold my-2 flex items-center"><ArrowRight />blankLinesCounter.sh</li>
          <p>Counts blank lines in the text</p>
          <Rio code={`#!/usr/bin/env bash

usage() {
    echo "Usage: $0 <filename>"
    echo "Counts the number of blank lines in the specified file."
}

if [ $# -eq 0 ]; then
    echo "Error: No file specified."
    usage
    exit 1
fi

if [ ! -f "$1" ]; then
    echo "Error: File '$1' not found."
    usage
    exit 1
fi

blank_lines=$(grep -c '^\s*$' "$1")

echo "File: $1"
echo "Number of blank lines: $blank_lines"

exit 0`} language={"bash"} showLineNumbers={true} />

          <li className="text-xl font-bold my-2 flex items-center"><ArrowRight />findNames.sh</li>
          <p>Finds and lists names in the text</p>
          <Rio code={`#!/usr/bin/env bash

if [ $# -eq 0 ]; then
    echo "Error: Please provide a file name as an argument."
    echo "Usage: $0 <filename>"
    exit 1
fi

if [ ! -f "$1" ]; then
    echo "Error: File '$1' not found."
    exit 1
fi

name_pattern='\<[A-Z][a-z]+\>'

grep -oE "$name_pattern" "$1" | sort -u | while read -r name; do
    echo "'$name' is a proper name"
done

exit 0`} language={"bash"} showLineNumbers={true} />

          <li className="text-xl font-bold my-2 flex items-center"><ArrowRight />statsSentences.sh</li>
          <p>Analyzes sentence statistics</p>
          <Rio code={`#!/usr/bin/bash

file=$(cat $1)

cantidaddeoraciones='echo $file | tr -cd "\." | wc -c'
OIFS=$IFS
IFS='.'
letrasoracionlarga=0
letrasoracioncorta=1000


for oracion in $file
do
  if [[ $ {#oracion} -gt $letrasoracionlarga ]]
  then
    letrasoracionlarga=$ {#oracion}
  fi
  if [[ $ {#oracion} -lt $letrasoracioncorta ]]
  then
    letrasoracioncorta=$ {#oracion}
  fi
  promedio=$(($promedio + $ {#oracion}))
done

promedio=$(($promedio/$cantidaddeoraciones))

echo "La oración más larga: "$letrasoracionlarga "letras."
echo "La oración más corta: "$letrasoracioncorta "letras."
echo "Ell promedio de las oraciones es de "$promedio "letras."

IFS=$OIFS
unset OIFS

exit 0`} language={"bash"} showLineNumbers={true} />

          <li className="text-xl font-bold my-2 flex items-center"> <ArrowRight /> statsUsageWords.sh</li>
          <p>Analyzes word usage statistics</p>
          <Rio code={`#!/usr/bin/bash
texto=$(cat $1)

declare -A diccionario

for palabra in $texto
do 
	largopalabra=$ {#palabra}
	if [[ $largopalabra -lt 4 ]]
	then
		diccionario[$palabra]=$(($ {diccionario[$palabra]} + 1))
	fi
done 

echo "Top 10 palabras más  usadas"

for i in $ {!diccionario[@]}
do
       echo $i ' - ' $ {diccionario[$i]}
done | sort -rn -k3 | head -n 10`} language={"bash"} showLineNumbers={true} />

          <li className="text-xl font-bold my-2 flex items-center"> <ArrowRight />statsWords.sh</li>
          <p>Provides general word statistics</p>
          <Rio code={`#!/usr/bin/bash

texto=$(cat $1)

palabralarga=0
palabracorta=30
suma=0
cantidad=0
for x in $texto
do 
	echo $x | tr -d [".",",",":","-"] >> textosinpuntos.txt
done

for i in $(cat textosinpuntos.txt)
do
	palabra=$(echo $ {#i})
	if [[ $palabra -lt $palabracorta ]];then
		palabracorta=$(($palabra))
        fi

	if [[ $palabra -gt $palabralarga ]]; then
		palabralarga=$(($palabra))
	fi

	suma=$(($suma + $palabra))
	cantidad=$(($cantidad + 1))

done

promedio=$(($suma/$cantidad))
echo "Cantidad de letras de la palabra más corta: $palabracorta"
echo "Cantidad de letras de la palabra más larga : $palabralarga"
echo "El promedio de longitud de palabras es de $promedio letras"

rm textosinpuntos.txt
exit 0`} language={"bash"} showLineNumbers={true} />

        </ol>

        <p className="my-3">I have improved and optimized the code but here you can find the original in this <Link className="font-semibold" href="https://github.com/Jazbarrionuev0/TP_Final_Entorno">repository</Link>. </p>


      </div>
    </div>
  );
}
