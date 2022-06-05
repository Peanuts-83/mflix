import style from 'styles/modal.module.css'

export default function LoadingModal() {

  return (
    <div className={style.container}>
      <div className={style.spinner}>
        loading
        <span className={style.spinnerSpan}></span>
      </div>
    </div>
  )
}
