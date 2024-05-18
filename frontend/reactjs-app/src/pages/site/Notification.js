import IonIcon from '@reacticons/ionicons';


const notification = () => {
  return (
    <div className="notification-toast" data-toast>
      <button className="toast-close-btn" data-toast-close>
        <IonIcon name="close-outline" />
      </button>
      <div className="toast-banner">
        <img src="./assets/images/products/jewellery-1.jpg" alt="Rose Gold Earrings" width={80} height={70} />
      </div>
      <div className="toast-detail">
        <p className="toast-message">
          Someone in new just bought
        </p>
        <p className="toast-title">
          Rose Gold Earrings
        </p>
        <p className="toast-meta">
          <time dateTime="PT2M">2 Minutes</time> ago
        </p>
      </div>
    </div>

  );
};
export default notification;