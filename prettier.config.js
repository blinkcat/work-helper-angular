/**
 * @see http://json.schemastore.org/prettierrc
 * @see https://prettier.io/docs/en/options.html
 */
// Do not add items that conflicts to tslint.json, since 'drcp lint --fix` (tslint & eslint fix) can do most of the code format job, let it handle them.
// Only add new item that is not supported by tslint/eslint.
module.exports = {
  arrowParens: 'avoid', // Omit parens when possible. Example: `x => x`
  bracketSpacing: true, // Print spaces between brackets
  cursorOffset: -1, // Print (to stderr) where a cursor at the given position would move to after formatting.\nThis option cannot be used with --range-start and --range-end.
  insertPragma: false, // Insert @format pragma into file's first docblock comment
  jsxBracketSameLine: false, // Put > on the last line instead of at a new line
  printWidth: 120, // The way Prettier breaking lines sucks, we don't want to a long array/object's items/properties being broken into
  // many lines which increase the total line number of a single file, and which is not read-friendly to human.
  // (Yes, breaking lines is good for code comparision or history blame, but who cares.)
  // TODO: Figure out smarter settings.

  proseWrap: 'preserve', // How to wrap prose. (markdown)"
  // rangeEnd: null, // Format code ending at a given character offset (exclusive).\nThe range will extend forwards to the end of the selected statement.\nThis option cannot be used with --cursor-offset
  // rangeStart: 0, // Format code starting at a given character offset.\nThe range will extend backwards to the start of the first line containing the selected statement.\nThis option cannot be used with --cursor-offset
  requirePragma: false, // Require either '@prettier' or '@format' to be present in the file's first docblock comment\nin order for it to be formatted
  semi: true, // Print semicolons
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none', // Print trailing commas wherever possible when multi-line
  useTabs: false
};
