import styles from './ScrollButton.module.css'

const ScrollButton = () => {
    const scrollToDown = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        })
    }
    const scrollToUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
      return (
    <div className={styles.btn}>
      <button  onClick={scrollToUp}>↑</button>
      <button  onClick={scrollToDown}>↓</button>
    </div>
  )
}

export default ScrollButton
