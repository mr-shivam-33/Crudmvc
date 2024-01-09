package WhileLoop;
import java.util.Scanner;
public class Palindrom {
	public static void main(String[] args) {
		Scanner in = new Scanner(System.in);
		int num, temp, digit, rev=0;
		num = in.nextInt();
		temp =  num;
		while(num > 0) {
			digit = num % 10;
			rev = (rev * 10) + digit;
			num/= 10;
		}
		if(temp == rev) {
			System.out.print("Its palindrom number");
		} else {
			System.out.print("Its not palindrom number");
		}
		in.close();
	}
}
