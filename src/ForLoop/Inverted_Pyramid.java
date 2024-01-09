package ForLoop;
import java.util.Scanner;
public class Inverted_Pyramid {

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		System.out.println("Enter size");
		int size = in.nextInt();
		for(int i = 1; i <= size; i++) {
			for(int k = 1; k <=i ; k++ ) {
				System.out.print(" ");
			}
			for(int j = i; j <= size*2-i; j++) {
				System.out.print("*");
			}
			System.out.println();
		}
		in.close();
		

	}

}
