export const greet = (subject: string): void => {
  console.log('Start our long running job...');
  const seconds = 5;
  const start = Date.now();
  const delay = seconds * 1000;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (Date.now() - start > delay) {
      break;
    }
  }
  console.log('Finished our long running job');
};
