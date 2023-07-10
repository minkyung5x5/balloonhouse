import styles from "./House.module.css"

function House(){
    return (
        <div className={styles.sky}>
            <div className={styles.house}></div>
        </div>
    );
}

export default House;