/**********************************************************************
 *
 * @模块名称: messageCss
 *
 * @模块用途: messageCss
 *
 * @date: 2022/1/28 8:35
 *
 * @版权所有: pgli
 *
 **********************************************************************/
export const messageCss = `
    .qmsg.qmsg-wrapper{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, .55);
    font-size: 13px;
    font-variant: tabular-nums;
    line-height: 1;
    list-style: none;
    font-feature-settings: "tnum";
    position: fixed;
    top: 16px;
    left: 0;
    z-index: 1010;
    width: 100%;
    pointer-events: none;
}
.qmsg .qmsg-item{
    padding: 8px;
    text-align: center;
    -webkit-animation-duration: .3s;
    animation-duration: .3s;
    position: relative;
}
.qmsg .qmsg-item .qmsg-count{
    position: absolute;
    left: -4px;
    top: -4px;
    background-color: red;
    color: #fff;
    font-size: 12px;
    line-height: 16px;
    border-radius: 2px;
    display: inline-block;
    min-width: 16px;
    height: 16px;
    -webkit-animation-duration: .3s;
    animation-duration: .3s;
}
.qmsg .qmsg-item:first-child{
    margin-top: -8px;
}
.qmsg .qmsg-content{
    position: relative;
    display: inline-block;
    padding: 10px 16px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, .15);
    pointer-events: all;
    /* min-width: 175px; */
}
.qmsg .qmsg-content .qmsg-content-with-close{
    padding-right: 20px;
}
.qmsg .qmsg-icon{
    display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    top: 1px;
    margin-right: 8px;
    font-size: 16px;
}
.qmsg .qmsg-icon svg{
    display: inline-block;
}

.qmsg .qmsg-content-info .qmsg-icon{
    color: #1890ff;
    user-select: none;
}
.qmsg .qmsg-icon-close{
    position: absolute;
    top: 11px;
    right: 5px;
    padding: 0;
    overflow: hidden;
    font-size: 12px;
    line-height: 22px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: rgba(0, 0, 0, .45);
    transition: color .3s
}
.qmsg .qmsg-icon-close:hover>svg path{
    stroke: #555;
}
.qmsg .animate-turn{
    animation:MessageTurn 1s linear infinite;  
    -webkit-animation: MessageTurn 1s linear infinite;
}
@keyframes MessageTurn{
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
}
@-webkit-keyframes MessageTurn{
    0%{-webkit-transform:rotate(0deg);}
    25%{-webkit-transform:rotate(90deg);}
    50%{-webkit-transform:rotate(180deg);}
    75%{-webkit-transform:rotate(270deg);}
    100%{-webkit-transform:rotate(360deg);}
}

@-webkit-keyframes MessageMoveOut {
    0% {
        max-height: 150px;
        padding: 8px;
        opacity: 1
    }

    to {
        max-height: 0;
        padding: 0;
        opacity: 0
    }
}

@keyframes MessageMoveOut {
    0% {
        max-height: 150px;
        padding: 8px;
        opacity: 1
    }

    to {
        max-height: 0;
        padding: 0;
        opacity: 0
    }
}


@-webkit-keyframes MessageMoveIn {
    
    0% {
        transform: translateY(-100%);
        transform-origin: 0 0;
        opacity: 0
    }

    to {
        transform: translateY(0);
        transform-origin: 0 0;
        opacity: 1
    }
}

@keyframes MessageMoveIn {
    0% {
        transform: translateY(-100%);
        transform-origin: 0 0;
        opacity: 0
    }

    to {
        transform: translateY(0);
        transform-origin: 0 0;
        opacity: 1
    }
}
@-webkit-keyframes MessageShake {
    0%,
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  
    25%,
    75% {
        transform: translateX(-4px);
      opacity: 0.75;
    }
  
    50% {
        transform: translateX(4px);
        opacity: 0.25;
    }
  }
@keyframes MessageShake {
    0%,
    100% {
      transform: translateX(0px);
      opacity: 1;
    }
  
    25%,
    75% {
        transform: translateX(-4px);
      opacity: 0.75;
    }
  
    50% {
        transform: translateX(4px);
        opacity: 0.25;
    }
  }   
`
