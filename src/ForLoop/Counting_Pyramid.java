package ForLoop;
import java.util.Scanner;
public class Counting_Pyramid {

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		System.out.println("Enter Size");
		int size = in.nextInt();
		int c =1;
		for(int i = 1; i <= size; i++) {
			for(int k = 1; k <= size - i; k++) {
				System.out.print(" ");
			}
			for(int j = 1; j <= i*2-1; j++) {
				System.out.print(" "+c++);
			}
			System.out.println();
		}
		in.close();

	}

}


