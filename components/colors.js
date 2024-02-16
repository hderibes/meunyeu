export function mycolors(){
    // const colors = ["'#00353F'", '#08C5D1', '#FFBF66', '#D46F4D', '#430C05'];
    // return colors[Math.round(Math.random()*colors.length + 1)] || "#D46F4D"; 
    const generateRandomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
    return `#${generateRandomColor}`;
}