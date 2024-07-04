import Rio from "@/src/components/Code/Rio";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12">
      <h2 className="font-normal text-center text-7xl min-h-28">Algorithms</h2>
      <h2 className="font-semibold text-gray-500 text-center text-xl min-h-28">2023</h2>
      <div className="max-w-3xl mx-auto md:mt-0 p-4 md:p-8 lg:p-12 text-justify">

        <p className="my-3">This project is dedicated to implementing various algorithms using Python that I have developed during my Associate's Degree in Artificial Intelligence. The project features a range of algorithms, including some  <Link className="font-semibold" href="#sorting">sorting methods</Link>, <Link className="font-semibold" href="#binarytree">binary tree structures</Link>, and <Link className="font-semibold" href="#pathfinding">pathfinding techniques</Link>. </p>

        <p className="my-3"> Apart from what I learned at the university, I also enjoy reading. Here are some of the books that have helped me learn and improve my understanding of algorithms: <Link className="font-semibold" href="https://www.amazon.com/Learning-Algorithms-Programmers-Writing-Better/dp/1492091065">Learning Algorithms: A Programmer’s Guide to Writing Better Code by O'Reilly</Link> and <Link className="font-semibold" href="https://www.amazon.com/Structures-Algorithms-Python-Michael-Goodrich/dp/1118290275">Data Structures & Algorithms in Python by Michael T. Goodrich</Link>. </p>

        <p className="my-3">I wont be showing all the algorithms but you can find the complete code <Link className="font-semibold" href="https://colab.research.google.com/drive/1Oubs8a1bNVjz4P8MJyidJAOx3LcnuFxH#scrollTo=vwFYbWdOaJuE">here</Link>. </p>

        {/* SORTING */}
        <h1 id="sorting" className="text-3xl font-bold my-3 ">Sorting methods</h1>

        <ol className="flex flex-col gap-3">

          <li className="text-xl font-bold my-2 flex items-center">Stack</li>
          <p>Last-In-First-Out data structure</p>
          <Rio code={`%%file test_stack.py

class Stack:
  def __init__(self):
    self.items = []

  def push(self, item):
    self.items.append(item)

  def pop(self):
    return self.items.pop(-1)

  def isEmpty(self):
    return self.items == []

  def __str__(self):
    return str(self.items)`} language={"python"} showLineNumbers={true} />

          <li className="text-xl font-bold my-2 flex items-center">Queue</li>
          <p>First-In-First-Out data structure
          </p>
          <Rio code={`%%file test_supermarket.py

from test_stack import Stack

class Queue:
  def __init__(self):
    self.items = []

  def insert(self, element):
    self.items.append(element)

  def remove(self):
    return self.items.pop(0)

  def isEmpty(self):
    return self.items == []

class Cinta:
  def __init__(self, carritos):
    self.carritos = carritos

  def historial(self):
    productos = []

    while not self.carritos.isEmpty(): # Queue

      carrito = self.carritos.remove()

      while not carrito.isEmpty(): # Stack

        producto = carrito.pop()

        productos.append(str(producto))

    return productos

class Producto:
  def __init__(self, nombre):
    self.nombre = nombre

  def __str__(self):
    return str(self.nombre)

def carrito(*nombres):
  carrito = Stack()

  for nombre in nombres:
    carrito.push(nombre)

  return carrito

def test_historial_de_supermercado():
  carrito1 = carrito("Leche", "Huevos", "Mermelada")
  carrito2 = carrito("Harina", "Tomate", "Manteca")
  carrito3 = carrito("Vino", "Pescado", "Aceitunas")

  cola = Queue()
  cola.insert(carrito1)
  cola.insert(carrito2)
  cola.insert(carrito3)

  cinta = Cinta(cola)
  assert cinta.historial() == [
      "Mermelada", "Huevos", "Leche",
      "Manteca", "Tomate", "Harina",
      "Aceitunas", "Pescado", "Vino"
  ]`} language={"python"} showLineNumbers={true} />

          <li className="text-xl font-bold my-2 flex items-center">Priority Queue</li>

          <p>Here the elements have associated priorities
          </p>
          <Rio code={`%%file test_priority_queue.py
class PriorityQueue:
    def __init__(self):
        self.queue = []

    def is_empty(self):
        return len(self.queue) == 0

    def insert(self, item, priority):
        element = (priority, item)
        
        if self.is_empty():
            self.queue.append(element)
        else:
            inserted = False
            for i in range(len(self.queue)):
                if self.queue[i][0] > priority:
                    self.queue.insert(i, element)
                    inserted = True
                    break
            
            if not inserted:
                self.queue.append(element)

    def remove(self):
        if self.is_empty():
            return None
        return self.queue.pop(0)[1]  

    def peek(self):
        if self.is_empty():
            return None
        return self.queue[0][1] 

    def size(self):
        return len(self.queue)

    def __str__(self):
        return str([item for _, item in self.queue])`} language={"python"} showLineNumbers={true} />


        </ol>


        {/* BINARY TREE */}
        <h1 id="binarytree" className="text-3xl font-bold my-3 ">Binary Trees</h1>
        <ol className="flex flex-col gap-3">
          <li className="text-xl font-bold my-2 flex items-center">Binary Tree</li>
          <Rio code={`%%file test_tree.py

class Tree:
  def __init__(self, value, left=None, right=None):
    self.value = value
    self.left = left
    self.right = right

  def nodos(self):
    totales = 1
    totales += self.left.nodos()  if self.left  is not None else 0
    totales += self.right.nodos() if self.right is not None else 0
    return totales

  def menor_mayor(self):
    minimo = maximo = self.value

    if self.left is not None:
      (lminimo, lmaximo) = self.left.menor_mayor()
      minimo = min(minimo, lminimo)
      maximo = max(maximo, lmaximo)

    if self.right is not None:
      (rminimo, rmaximo) = self.right.menor_mayor()
      minimo = min(minimo, rminimo)
      maximo = max(maximo, rmaximo)

    return (minimo, maximo)

  def buscar(self, element):
    if self.value == element:
      return True

    if self.left is not None and self.left.buscar(element):
      return True

    if self.right is not None and self.right.buscar(element):
      return True

    return False

  def altura(self):
    altural = 0 if self.left is None else self.left.altura()
    alturar = 0 if self.right is None else self.right.altura()
    return 1 + max(altural, alturar)`} language={"python"} showLineNumbers={true} />

          <li className="text-xl font-bold my-2 flex items-center">Binary Search Tree</li>
          <p>This algorithm is a special type of binary tree that focus on efficient searching, insertion, and deletion operations. And like George Heineman says, it is "the godfather of all recursive data structures".</p>
          <Rio code={`%%file test_binary_search_tree.py

from test_tree import Tree

class BSTree(Tree):
  def menor_mayor(self):
    current = self
    while current.left is not None:
      current = current.left

    menor = current.value

    current = self
    while current.right is not None:
      current = current.right

    mayor = current.value

    return (menor, mayor)

  def buscar(self, val):
    if self.value == val:
      return True

    if self.left is not None and val < self.value:
      return self.left.buscar(val)

    if self.right is not None and val > self.value:
      return self.right.buscar(val)

    return False

  def insertar(self, val):
    if val <= self.value:
      if self.left is None:
        self.left = BSTree(val)
      else:
        self.left.insertar(val)

    else:
      if self.right is None:
        self.right = BSTree(val)
      else:
        self.right.insertar(val)`} language={"python"} showLineNumbers={true} />
        </ol>

        {/* PATH FINDING */}
        <h1 id="pathfinding" className="text-3xl font-bold my-3 ">Path Finding</h1>
        <ol className="flex flex-col gap-3">
          <li className="text-xl font-bold my-2 flex items-center">Breadth First Search</li>
          <p>Guarantees the shortest path in unweighted graphs</p>
          <Rio code={`from ..models.grid import Grid
from ..models.frontier import QueueFrontier
from ..models.solution import NoSolution, Solution
from ..models.node import Node

class BreadthFirstSearch:
    @staticmethod
    def search(grid: Grid) -> Solution:

        node = Node("", state = grid.start, cost = 0)

        explored = {} 
        explored[node.state] = True

        if grid.end == node.state:
            return Solution(node,explored)

        frontier = QueueFrontier()
        frontier.add(node)
        
        while True:

            if frontier.is_empty():
               return NoSolution(explored)
            
            node = frontier.remove()

            explored[node.state] = True

            neighbours = grid.get_neighbours(node.state)

            for accion in neighbours.keys():
                new_state = neighbours[accion]
                new_node = Node("", new_state, node.cost + grid.get_cost(new_state))
                new_node.parent = node
                new_node.action = accion

                if grid.end == new_node.state:
                    return Solution(node,explored)
                
                if new_node.state not in explored.keys():
                    explored[new_node.state] = True
                    frontier.add(new_node)`} language={"python"} showLineNumbers={true} />

          <li className="text-xl font-bold my-2 flex items-center">Depth First Search</li>
          <p>This one uses less memory than BFS for wide graphs and is very useful for decision tree problems</p>
          <Rio code={`from ..models.grid import Grid
from ..models.frontier import StackFrontier
from ..models.solution import NoSolution, Solution
from ..models.node import Node

class DepthFirstSearch:
    @staticmethod
    def search(grid: Grid) -> Solution:
    
        node = Node("", grid.start, 0)

        frontier = StackFrontier()
        frontier.add(node)

        explored = {} 
        #explored[node.state] = True
        while True:
            if frontier.is_empty():
               return NoSolution(explored)
            
            node = frontier.remove()

            if grid.end == node.state:
                return Solution(node,explored)
            
            if node.state not in explored.keys():
                explored[node.state] = True
            
                neighbours = grid.get_neighbours(node.state)
            
                for accion in neighbours.keys():
                    new_state = neighbours[accion]
                    new_node = Node("", new_state, node.cost + grid.get_cost(new_state))
                    new_node.parent = node
                    new_node.action = accion 
                    
                    if new_node not in explored:
                        frontier.add(new_node)

        return NoSolution(explored)`} language={"python"} showLineNumbers={true} />

          <li className="text-xl font-bold my-2 flex items-center">Greedy Best-First Search</li>
          <p>GBFS can find a solution without exploring the entire graph and it is more informed than BFS or DFS due to the use of a heuristic.</p>
          <Rio code={`from ..models.grid import Grid
from ..models.frontier import PriorityQueueFrontier
from ..models.solution import NoSolution, Solution
from ..models.node import Node

def manjaran(node, objetivo):
    discol = abs(node.state[0] - objetivo[0])
    disfil = abs(node.state[1] - objetivo[1])
    dist = discol**2 + disfil**2
    return dist**(1/2)

class GreedyBestFirstSearch:
    @staticmethod
    def search(grid: Grid) -> Solution:

        node = Node("", grid.start, 0)

        explored = {} 
        
        explored[node.state] = node

        if node.state == grid.end:
            return Solution(node, explored)

        frontier =  PriorityQueueFrontier()
        frontier.add(node, manjaran(node,grid.end))
        
        while True:
            if frontier.is_empty():
                return NoSolution(explored)
            
            node = frontier.pop()

            if grid.end == node.state:
                return Solution(node,explored)
            
            neighbours = grid.get_neighbours(node.state)

            for accion in neighbours.keys():
                new_state = neighbours[accion]
                new_node = Node("", new_state, node.cost + grid.get_cost(new_state))
                new_node.parent = node
                new_node.action = accion 

                if new_node.state not in explored or new_node.cost < explored[new_node.state].cost:
                    explored[new_node.state] = new_node
                    frontier.add(new_node, manjaran(new_node, grid.end))`} language={"python"} showLineNumbers={true} />

          <li className="text-xl font-bold my-2 flex items-center">A*</li>
          <p>This one will always find a solution if one exists and it is generally faster.</p>
          <Rio code={`from ..models.grid import Grid
from ..models.frontier import PriorityQueueFrontier
from ..models.solution import NoSolution, Solution
from ..models.node import Node

def manjaran(node, objetivo):
    discol = abs(node.state[0] - objetivo[0])
    disfil = abs(node.state[1] - objetivo[1])
    return discol + disfil

class AStarSearch:

    @staticmethod
    def search(grid: Grid) -> Solution:
        node = Node("", grid.start, 0)

        explored = {node.state: node}

        # explored[node.state] = True

        frontier = PriorityQueueFrontier()
        frontier.add(node, node.cost + manjaran(node, grid.end))

        while True:
            if frontier.is_empty():
                return NoSolution(explored)

            node = frontier.pop()

            if grid.end == node.state:
                return Solution(node, explored)

            neighbours = grid.get_neighbours(node.state)

            for action in neighbours.keys():
                new_state = neighbours[action]
                new_node = Node("", new_state, node.cost + grid.get_cost(new_state))
                new_node.parent = node
                new_node.action = action

                if new_node.state not in explored.keys() or new_node.cost < explored[new_node.state].cost:
                    estimated_distance = new_node.cost + manjaran(new_node, grid.end)
                    explored[new_node.state] = new_node
                    frontier.add(new_node, estimated_distance)`} language={"python"} showLineNumbers={true} />

          <li className="text-xl font-bold my-2 flex items-center"> Uniform Cost Search</li>
          <p>The UCS algorithm guarantees the optimal solution but can be slower.</p>
          <Rio code={`from ..models.grid import Grid
from ..models.frontier import PriorityQueueFrontier
from ..models.solution import NoSolution, Solution
from ..models.node import Node

class UniformCostSearch:
    @staticmethod
    def search(grid: Grid) -> Solution:
     
        node = Node("", grid.start, 0)

        explored = {node.state:node} 
        
        #explored[node.state] = True
        
        frontier = PriorityQueueFrontier()
        frontier.add(node,node.cost)

        while True:
            if frontier.is_empty():
               return NoSolution(explored)
            
            node = frontier.pop()

            if grid.end == node.state:
                return Solution(node,explored)
            
            neighbours = grid.get_neighbours(node.state)

            for accion in neighbours.keys():
                new_state = neighbours[accion]
                new_node = Node("", new_state, node.cost + grid.get_cost(new_state))
                new_node.parent = node
                new_node.action = accion
                
                if new_node.state not in explored.keys() or new_node.cost < explored[new_node.state].cost:
                    explored[new_node.state] = new_node
                    frontier.add(new_node,new_node.cost)

        return NoSolution(explored)`} language={"python"} showLineNumbers={true} />

        </ol>

        <p className="my-3">You can find the complete code of Path Finding Algorithms in this <Link className="font-semibold" href="https://github.com/Jazbarrionuev0/PathFinding-A-BFS-DFS-GBFS-GORIGHT-UCS">repository</Link>. </p>


      </div>
    </div>
  );
}
