import java.util.Scanner;

public class MovingIntervels {

	public long noOfCakes;
	public int noOfPersons;
	public int k;
	public long totalCakesRequiredForAll;
	public long startIndexsOfPerson[];
	public long endIndexOfPerson[];
	public long maxFreeSpace;
	public static final String _BAD_ = "BAD Request !!";
	public static final String _PERFECT_ = "Perfect !!";

	public static void main(String[] args) {
		MovingIntervels mv = new MovingIntervels();
		mv.readAllInputs();
		mv.sortArrays();
		mv.printAllPersons();
		System.out.println(mv.calculate());
	}

	public String calculate() {
		if (this.totalCakesRequiredForAll > this.noOfCakes) {
			return MovingIntervels._BAD_;
		}
		if (this.k == 0) {
			return this.caluculateAsItIs();
		}
		return this.caluculateWithOneShift();
	}

	public void readAllInputs() {
		System.out.println(
				"Enter Value Values in sequence 'No of Cakes'  'No of Persons'  'K' folowed by start index of person and end Index of person for all persons ::");
		Scanner s = new Scanner(System.in);
		this.noOfCakes = s.nextLong();
		this.noOfPersons = s.nextInt();
		this.k = s.nextInt();
		this.startIndexsOfPerson = new long[this.noOfPersons];
		this.endIndexOfPerson = new long[this.noOfPersons];
		this.totalCakesRequiredForAll = 0;
		for (int i = 0; i < this.noOfPersons; i++) {
			this.startIndexsOfPerson[i] = s.nextLong();
			this.endIndexOfPerson[i] = s.nextLong();
			if (startIndexsOfPerson[i] < endIndexOfPerson[i]) {
				this.totalCakesRequiredForAll += ((endIndexOfPerson[i] - startIndexsOfPerson[i]) + 1);
			} else {
				this.totalCakesRequiredForAll += ((startIndexsOfPerson[i] - endIndexOfPerson[i]) + 1);
			}
		}
		s.close();
	}

	public void sortArrays() {
		for (int i = 0; i < startIndexsOfPerson.length; i++) {
			for (int j = i + 1; j < startIndexsOfPerson.length; j++) {
				if (startIndexsOfPerson[i] > startIndexsOfPerson[j]) {
					long temp1 = startIndexsOfPerson[i];
					startIndexsOfPerson[i] = startIndexsOfPerson[j];
					startIndexsOfPerson[j] = temp1;
					long temp2 = endIndexOfPerson[i];
					endIndexOfPerson[i] = endIndexOfPerson[j];
					endIndexOfPerson[j] = temp2;
				}
			}
		}
		this.maxFreeSpace = this.startIndexsOfPerson[0] - 1;
		if (this.endIndexOfPerson[this.endIndexOfPerson.length - 1] < this.noOfCakes) {
			long tailSpace = this.noOfCakes - this.endIndexOfPerson[this.endIndexOfPerson.length - 1];
			if (tailSpace > this.maxFreeSpace) {
				this.maxFreeSpace = tailSpace;
			}
		}
		for (int i = 0; i < startIndexsOfPerson.length - 1; i++) {
			long intervelSpace = startIndexsOfPerson[i + 1] - endIndexOfPerson[i];
			if (intervelSpace > this.maxFreeSpace) {
				this.maxFreeSpace = intervelSpace;
			}
		}
	}

	public void printAllPersons() {
		for (int i = 0; i < startIndexsOfPerson.length; i++) {
			System.out.println("Person " + (i + 1) + "\t" + "=> Start: " + this.startIndexsOfPerson[i] + "\t End: "
					+ this.endIndexOfPerson[i]);
		}
		System.out.println("Max Free Interval Space : " + this.maxFreeSpace);
		System.out.println("Toatal no of cakes Required for All : " + this.totalCakesRequiredForAll);
		System.out.println("Toatl Avaliable cakes : " + this.noOfCakes);
	}

	public String caluculateAsItIs() {
		for (int i = 0; i < this.startIndexsOfPerson.length - 1; i++) {
			if (this.endIndexOfPerson[i] >= this.startIndexsOfPerson[i + 1]) {
				return MovingIntervels._BAD_;
			}
		}
		return MovingIntervels._PERFECT_;
	}

	public String caluculateWithOneShift() {
		this.sortArrayWithEndIndexOfWhichHaveSameStartIndex();
		return MovingIntervels._PERFECT_;
	}

	public void sortArrayWithEndIndexOfWhichHaveSameStartIndex() {
		int i = 0;
		int count = 0;
		while (i < this.startIndexsOfPerson.length - 1) {
			if (this.startIndexsOfPerson[i] == this.startIndexsOfPerson[i + 1]) {
				count++;
			} else {
				if (count > 0) {
					if(count > 1) {
						System.out.println(MovingIntervels._BAD_);
						System.exit(0);
					}
					this.sortFromTo(i - count, i);
				}
				count = 0;
			}
			i++;
		}
		this.printAllPersons();
	}

	public void sortFromTo(int from, int to) {
		for (; from < to; from++) {
			for (int j = from + 1; j < to; j++) {
				if (this.endIndexOfPerson[from] > this.endIndexOfPerson[j]) {
					long temp = endIndexOfPerson[from];
					this.endIndexOfPerson[from] = this.endIndexOfPerson[from + 1];
					this.endIndexOfPerson[from + 1] = temp;
				}
			}
		}

	}

}
