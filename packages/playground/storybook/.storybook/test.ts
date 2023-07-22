
// /**
//  * 任务
//  */
// class Task {
//   code: string;
// }

// /**
//  * 微任务
//  */
// class MicroTask {
//   code: string;
// }

// let isRun = true;

// /**
//  * 线程中断
//  */
// function exit() {
//   isRun = false;
// }

// function useCode(code) {

//   /**
//    * 任务队列
//    */
//   const taskQueue: Task[] = [];
//   /**
//    * 微任务队列
//    */
//   const microQueue: MicroTask[] = [];

//   /**
//    * 解析代码生成语法树
//    */
//   function parseCode1(code: string) {
//     // 解析代码生成执行栈
//     const execMap = {
//       setTimeout1: () => {
//         console.log('1');
//         Promise.resolve().then(() => {
//           console.log('3');
//         });
//       },
//       setTimeout2: () => {
//         console.log('2');
//       }
//     };
//     return execMap;
//   }
// }




// /**
//  * 主线程
//  * @param code 需要执行的代码
//  */
// function main(code: string) {


//   // 解析代码
//   const tree = parseCode1(code);

//   // 开始执行代码
//   while(isRun) {
//     tree.setTimeout1
//   }

// }

// main(`
//   setTimeout(() => {
//     console.log('1');
//     Promise.resolve().then(() => {
//       console.log('3');
//     });
//   });

//   setTimeout(() => {
//     console.log('2');
//   });
// `);