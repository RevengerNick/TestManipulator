export const optimizeWithRLE = (command: string): string => {
    if (!command) return "";
    let result = "";
    let count = 1;
    for (let i = 0; i < command.length; i++) {
      if (command[i] === command[i + 1]) {
        count++;
      } else {
        result += (count > 1 ? count : '') + command[i];
        count = 1;
      }
    }
    return result;
  };
  
  const memo: { [key: string]: string } = {};
  
  export const optimizeAdvanced = (command: string): string => {
    if (!command) return "";
    if (memo[command]) return memo[command];
  
    const firstChar = command[0];
    let initialGroupLength = 1;
    while (initialGroupLength < command.length && command[initialGroupLength] === firstChar) {
      initialGroupLength++;
    }
    
    const restOfString = command.substring(initialGroupLength);
    const prefix = (initialGroupLength > 1 ? initialGroupLength : "") + firstChar;
    
    let bestResult = prefix + optimizeAdvanced(restOfString);
  
    for (let blockLen = 1; blockLen <= Math.floor(command.length / 2); blockLen++) {
      const block = command.substring(0, blockLen);
      let repeatCount = 1;
  
      while (command.startsWith(block.repeat(repeatCount + 1))) {
        repeatCount++;
      }
  
      if (repeatCount > 1) {
        const optimizedBlock = optimizeWithRLE(block);
        const restAfterBlock = command.substring(blockLen * repeatCount);
        const currentCandidate = `${repeatCount}(${optimizedBlock})` + optimizeAdvanced(restAfterBlock);
  
        if (currentCandidate.length < bestResult.length) {
          bestResult = currentCandidate;
        }
      }
    }
  
    memo[command] = bestResult;
    return bestResult;
  };
  
  export const clearOptimizerCache = () => {
      Object.keys(memo).forEach(key => delete memo[key]);
  };