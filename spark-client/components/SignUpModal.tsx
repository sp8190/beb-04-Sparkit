import React, { ReactElement } from "react";

interface props {
  open: boolean;
  close: () => void; // 함수 타입 정의할 때
}

const OrderModal = (props: props): ReactElement => {
  const { open, close } = props;

  return (
    <div className={open ? "bg" : ""}>
      <div className={open ? "modal active" : "modal"}>
        {open ? (
          <div className="area">
            <button className="close" onClick={close}>
              {" "}
              x{" "}
            </button>
            <p>회원가입 모달 내용</p>
          </div>
        ) : null}
      </div>
      <style jsx>{`
        .bg {
          top: 25%;
          left: 25%;
          height: 50%;
          width: 50%;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          overflow: hidden;
          position: absolute;
          z-index: 100;
        }
      `}</style>
    </div>
  );
};

export default OrderModal;
