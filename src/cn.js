function collectDecls(classNames, outDecls) {
  for (let i = 0; i < classNames.length; i++) {
    const className = classNames[i];

    if (Array.isArray(className)) {
      collectDecls(className, outDecls);
    } else if (className) {
      const parts = className.split(" ");

      for (let x = 0; x < parts.length; x++) {
        const part = parts[x];
        outDecls[part] = part;
      }
    }
  }
}

export function cn(classNames) {
  const decls = {};

  collectDecls(classNames, decls);

  const str = [];

  for (const key in decls) {
    const value = decls[key];
    str.push(value);
  }

  return str.join(" ");
}
