// Console configuration for production
const setupConsole = () => {
  if (process.env.NODE_ENV === 'production') {
    const noop = () => {};
    
    // Save original console methods
    const originalConsole = {
      log: console.log,
      info: console.info,
      warn: console.warn,
      debug: console.debug
    };

    // Override console methods
    console.log = noop;
    console.info = noop;
    console.debug = noop;
    console.warn = noop;

    // Keep error for critical issues
    // console.error remains unchanged
  }
};

export default setupConsole; 