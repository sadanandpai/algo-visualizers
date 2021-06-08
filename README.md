<h1 align="center">
    Sorting Visualizer
</h1>

## Responsive visualizer built using React for popular algorithms

<a href="https://sadanandpai.github.io/sorting-visualizer/dist/"><img src="cover.png" alt="cover" /></a>
[See it in action](https://sadanandpai.github.io/sorting-visualizer/dist/)

---

## This repo is an attempt to help in learning popular sorting algorithms by visualization

Helps to

- understand the working of sorting algorithm
- check total swaps required
- check total comparisions
- compare algorithms side by side
- know the time taken (time is just an approximate unit for comparision)

Features

- Sort any given array of 3 digits positive integers
- Alter the speed of execution
- Start, pause and reset the execution
- Generate random array of numbers of sorting

### Technologies

- React with hooks
- [Styled components](https://styled-components.com/) + [React material](https://material-ui.com/) (css and component libraries)
- [Zustand](https://github.com/pmndrs/zustand) (hooks based state management library)
- [Vite](https://vitejs.dev/) (Bundler)

### Features built using

- Animations are done using pure CSS and uses [FLIP principle](https://aerotwist.com/blog/flip-your-animations/)
- Flex is used for array display and manipulation of positions (flex order property)
- JavaScript async generators are used heavily for the controlled execution of algorithms

### Run in your local

- ```git clone https://github.com/sadanandpai/sorting-visualizer.git```
- ```npm install``` (after navigating inside the directory)
- ```npm run dev```

---

### Contributing Guide

If you want to contribute, improve or fix bugs in this repo, then check out the [Contributing Guide](./CONTRIBUTING.md)
<br/>

### License

This repository is MIT licensed. [Read more](./LICENSE)
