import Rio from "@/src/components/Code/Rio";
import TagContainer from "@/src/components/TagContainer/TagContainer";
import { Data } from "@/src/utils/projectstags";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12 text-justify">
      <h2 className="font-normal text-center text-7xl min-h-28">Rio de Janeiro Data Analysis</h2>
      <h2 className="font-semibold text-gray-500 text-center text-xl min-h-28">2022</h2>
      <div className="">
        <p className="mb-3 text-sm text-right ">2-minute read</p>
        <TagContainer tags={Data} />
      </div>
      <p className="my-3">
        The focus of this analysis is on Rio de Janeiro, utilizing neighborhood information, prices, and rental types to answer the following
        questions:
      </p>

      <ol className="flex flex-col gap-3">
        <li className="text-2xl font-bold my-3">Average price per rental type in Rio de Janeiro:</li>
        <p>
          Implemented a function precio_promedio_por_tipo_de_alquiler() that calculates the average price for each rental type. The results are stored
          in a dictionary where the rental type serves as the key, and the average price as the value.
        </p>
        <p>
          For the analysis of the first problem, we aim to determine the average price per rental type, and this information is stored in a dictionary
          where each rental type is associated with its average price. The process involves summing the prices for each rental type and then
          calculating the average.
        </p>

        <Rio
          code={`import csv
from statistics import mean
import matplotlib.pyplot as plt
import seaborn as sns

def average_price_by_room_type(filename):
    prices = {'Entire home/apt': [], 'Private room': [], 'Hotel room': [], 'Shared room': []}
    
    with open(filename, newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            room_type = row['room_type']
            price = float(row['price'])
            if room_type in prices:
                prices[room_type].append(price)
    
    return {room_type: mean(price_list) if price_list else 0 
            for room_type, price_list in prices.items()}

def plot_average_prices(averages):
    sns.set(style="whitegrid")
    plt.figure(figsize=(15, 6))
    plt.bar(averages.keys(), averages.values())
    plt.xticks(rotation=45, ha='right')
    plt.xlabel('Room Type', fontsize=15)
    plt.ylabel('Average Price', fontsize=15)
    plt.title('Average Price by Room Type', fontsize=20)
    plt.tight_layout()
    plt.savefig('average_prices.png')
    plt.show()

def main():
    filename = "listings.csv"
    averages = average_price_by_room_type(filename)
    print("Average prices by room type:")
    for room_type, avg_price in averages.items():
        print(f"{room_type}: $ {avg_price:.2f}")
    
    plot_average_prices(averages)

if __name__ == "__main__":
    main()`}
          language={"python"}
          showLineNumbers={true}
        />
        <Image
          className="w-full rounded-sm  m-auto"
          src={"/projects/data-analysis/firstchart.png"}
          alt="Jazmin Barrionuevo"
          width={564}
          height={420}
        />
        <li className="text-2xl font-bold my-3">Number of rental types per neighborhood:</li>
        <p>
          The function cantidad_de_tipos_por_barrio() returns a dictionary, tipo_de_alquiler_por_barrio, mapping neighborhoods to the count of each
          rental type available in that neighborhood.
        </p>
        <p>
          The second analysis is addressed by the function cantidad_de_tipos_por_barrio(), which returns a dictionary named
          tipo_de_alquiler_por_barrio. This dictionary has neighborhoods as keys and another dictionary as values. The inner dictionary has rental
          types as keys and the count of each type in that neighborhood as values.
        </p>
        <Rio
          code={`import csv
from collections import defaultdict
import matplotlib.pyplot as plt
import seaborn as sns

def load_data(filename):
    data = []
    with open(filename, newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            data.append({
                'neighbourhood': row['neighbourhood'],
                'room_type': row['room_type'],
                'price': int(row['price'])
            })
    return data

def count_types_by_neighborhood(data):
    counts = defaultdict(lambda: defaultdict(int))
    for item in data:
        counts[item['neighbourhood']][item['room_type']] += 1
    return dict(counts)

def average_price_by_neighborhood_and_type(data):
    totals = defaultdict(lambda: defaultdict(lambda: [0, 0]))
    for item in data:
        neighborhood = item['neighbourhood']
        room_type = item['room_type']
        price = item['price']
        totals[neighborhood][room_type][0] += price
        totals[neighborhood][room_type][1] += 1
    
    averages = {}
    for neighborhood, types in totals.items():
        averages[neighborhood] = {room_type: total / count if count else 0 
                                  for room_type, (total, count) in types.items()}
    return averages

def get_urca_prices(data):
    return [item['price'] for item in data if item['neighbourhood'] == 'Urca']

def plot_room_types(data, neighborhood):
    counts = count_types_by_neighborhood(data)
    if neighborhood not in counts:
        print(f"Neighborhood '{neighborhood}' not found.")
        return
    
    room_types = counts[neighborhood]
    plt.figure(figsize=(15, 6))
    plt.bar(room_types.keys(), room_types.values())
    plt.xticks(rotation=90)
    plt.xlabel("Room Types", fontsize=15)
    plt.ylabel('Number of Listings', fontsize=15)
    plt.title(neighborhood, fontsize=20)
    plt.tight_layout()
    plt.savefig('room_types.png')
    plt.show()

def main():
    data = load_data("listings.csv")
    
    counts = count_types_by_neighborhood(data)
    print("Counts by neighborhood and room type:")
    print(counts)
    
    averages = average_price_by_neighborhood_and_type(data)
    print("\nAverage prices by neighborhood and room type:")
    print(averages)
    
    urca_prices = get_urca_prices(data)
    print("\nPrices in Urca neighborhood:", urca_prices)
    
    sns.set()
    neighborhood = input("Choose a neighborhood to plot: ")
    plot_room_types(data, neighborhood)

if __name__ == "__main__":
    main()`}
          language={"python"}
          showLineNumbers={true}
        />
        <Image
          className="w-full rounded-sm  m-auto"
          src={"/projects/data-analysis/secondchart.png"}
          alt="Jazmin Barrionuevo"
          width={564}
          height={420}
        />
        <li className="text-2xl font-bold my-3">Number of listings per neighborhood:</li>
        <p>
          The function cantidad_anuncios_barrio() calculates the total number of listings for each neighborhood and returns a dictionary with
          neighborhoods as keys and the corresponding number of listings as values.
        </p>
        <p>
          The third analysis is the function cantidad_anuncios_barrio(), which returns a dictionary named cantidad_anuncios_barrio. It maps each
          neighborhood to the total number of listings in that neighborhood.
        </p>
        <Rio
          code={`import csv
from collections import Counter
import matplotlib.pyplot as plt
import seaborn as sns

def count_listings_by_neighborhood(filename):
    neighborhood_counts = Counter()
    
    with open(filename, newline='') as file:
        reader = csv.DictReader(file)
        for row in reader:
            neighborhood_counts[row['neighbourhood']] += 1
    
    return dict(neighborhood_counts)

def plot_listings_by_neighborhood(counts, start_range, end_range, exclude_neighborhood=None):
    if exclude_neighborhood:
        counts = {k: v for k, v in counts.items() if k != exclude_neighborhood}
    
    neighborhoods = list(counts.keys())[start_range:end_range]
    listing_counts = [counts[neighborhood] for neighborhood in neighborhoods]
    
    sns.set(style="whitegrid")
    plt.figure(figsize=(30, 6))
    plt.bar(neighborhoods, listing_counts)
    plt.xticks(rotation=90, fontsize=10)
    plt.yticks(fontsize=10)
    plt.xlabel('Neighborhood', fontsize=15)
    plt.ylabel('Number of Listings', fontsize=15)
    title = 'Number of Listings by Neighborhood'
    if exclude_neighborhood:
        title += f' (Excluding {exclude_neighborhood})'
    plt.title(title, fontsize=20)
    
    # Adjust y-axis limit based on the range
    if start_range > 30:
        plt.ylim(0, 500)
    elif start_range > 10:
        plt.ylim(0, 1500)
    elif start_range > 1:
        plt.ylim(0, 3000)
    
    plt.tight_layout()
    plt.savefig('listings_by_neighborhood.png', bbox_inches='tight')
    plt.show()

def main():
    filename = "listings.csv"
    neighborhood_counts = count_listings_by_neighborhood(filename)
    print("Number of listings by neighborhood:")
    for neighborhood, count in neighborhood_counts.items():
        print(f"{neighborhood}: {count}")
    
    start_range = int(input("Enter the starting index for the range of neighborhoods to display (0-153): "))
    end_range = int(input("Enter the ending index for the range of neighborhoods to display (0-153): "))
    
    plot_listings_by_neighborhood(neighborhood_counts, start_range, end_range)
    
    # Plot without Copacabana
    plot_listings_by_neighborhood(neighborhood_counts, start_range, end_range, exclude_neighborhood="Copacabana")

if __name__ == "__main__":
    main()
        
        `}
          language={"python"}
          showLineNumbers={true}
        />
        <Image
          className="w-full rounded-sm  m-auto"
          src={"/projects/data-analysis/thridchart.png"}
          alt="Jazmin Barrionuevo"
          width={564}
          height={420}
        />
        <Image
          className="w-full rounded-sm  m-auto"
          src={"/projects/data-analysis/thridchart2.png"}
          alt="Jazmin Barrionuevo"
          width={564}
          height={420}
        />
      </ol>
      <p className="my-3">
        The dataset used for this analysis can be found{" "}
        <Link className="font-semibold" href="http://data.insideairbnb.com/brazil/rj/rio-de-janeiro/2022-06-20/visualisations/listings.csv">
          here
        </Link>{" "}
        . I have improved and optimized the code but here you can find the original{" "}
        <Link className="font-semibold" href="https://colab.research.google.com/drive/15htreZACb65vlyc3lc2tIAurbBkqR3nX">
          file
        </Link>
        .{" "}
      </p>
    </div>
  );
}
