package ForLoop;
import java.util.Scanner;
public class HollowInvertedleftHalfPyramid {

	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		System.out.println("Enter row");
		int row = in.nextInt();
		System.out.println("Enter col");
		int col = in.nextInt();
		for(int i = 1; i <= row; i++) {
			for(int j = col; j>= i; j--) {
				if((i == 1 || i == row) || (j == col || j == i)) {
					System.out.print("*");
				} else {
					System.out.print(" ");
				}
			}
			System.out.println();
		}
		in.close();

	}

}
