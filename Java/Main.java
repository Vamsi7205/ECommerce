
import java.util.*;

// Function Interface
interface Calculate {
	
	//return sum of 2 variables using lambda expressions
	int sum(int a, int b);
	
	//return product of 2 variables using default method
	default int product(int a, int b)
	{
		return a*b;
	}
	
	// static method of interfaces
	static void staticMethod() {
		System.out.println("static Method Executed");
	}
}


interface Interface{
	void helloWrld() ;
}
public class Main {

	void hello() {
		System.out.println("Method reference");
	}
	
	public static void main(String[] args) {
		Calculate calculator = (a,b)->{return a+b;};
		int sum = calculator.sum(10, 80);
		int product = calculator.product(10, 80);
		System.out.println("sum is "+sum);
		System.out.println("product is "+product);
		Calculate.staticMethod();
		List<Integer> list = new ArrayList();
		list.add(1);
		list.add(1);
		list.add(11);
		list.add(201);
		list.add(50);
		System.out.println("List Elements ");
		list.forEach(s->System.out.print(s+" "));

		
	}

}
