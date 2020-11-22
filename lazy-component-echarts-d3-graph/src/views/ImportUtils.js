async function lazyLoadComponent (componentName) {
  const allComps = await import(/* webpackChunkName: "about" */ '../views/AboutGraphIndex')
  return allComps[componentName]
}

export { lazyLoadComponent }
export default { lazyLoadComponent }
