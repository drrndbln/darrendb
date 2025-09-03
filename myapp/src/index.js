// Simple JS code: greeting based on time
const date = new Date();
const hour = date.getHours();

let greeting;

if (hour < 12) {
    greeting = "Good morning!";
} else if (hour < 18) {
    greeting = "Good afternoon!";
} else {
    greeting = "Good evening!";
}

console.log(greeting);
