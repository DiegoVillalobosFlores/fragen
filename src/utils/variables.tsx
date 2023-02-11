export const FRAGEN_GRAPH_NAME = 'Fragen'

export const motionVariables = {
  staggeredChildren: {
    container: {
      hidden: {opacity: 0},
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.4
        }
      }
    },
    child:{
      hidden: { opacity: 0 },
      show: { opacity: 1 }
    }
  },
  growingCorners: {
    hoverStart: {
      width: 40,
      height: 40
    },
    hoverEnd: {
      width: 20,
      height: 20
    }
  }
}
