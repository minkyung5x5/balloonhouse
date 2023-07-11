import styles from "./Balloon.module.css"

function Balloon(){
    const balloonNumber = 5;
    const balloonArr = ['red', 'green', 'orange', 'blue', 'yellow']
    const balloonSet = () => {
        const result = [];
        for (let i = 0; i < balloonArr.length; i++) {
            result.push(
                <div className={`${styles['balloon-wrapper']} ${styles[balloonArr[i]]}`}>
                    <div className={styles.string}></div>
                    <div className={styles.balloon}></div>
                </div>
            );
        }
        return result;
    }

    return (
        <div className={styles.box}>
            {balloonSet()}
        </div>
    );
}

export default Balloon;