import React from 'react';

// Note : La span autour des SVG permet de cibler plus facilement au clic

export const Infobulle = ({onClick = null, fill = null, className = "info-bulle"}) => {
  return (
    <span onClick={onClick} className={className}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M8 15C9.85652 15 11.637 14.2625 12.9497 12.9497C14.2625 11.637 15 9.85652 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1C6.14348 1 4.36301 1.7375 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8C1 9.85652 1.7375 11.637 3.05025 12.9497C4.36301 14.2625 6.14348 15 8 15V15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16V16Z" fill="#F19737"/>
        <path d="M8.93001 6.58801L6.64001 6.87501L6.55801 7.25501L7.00801 7.33801C7.30201 7.40801 7.36001 7.51401 7.29601 7.80701L6.55801 11.275C6.36401 12.172 6.66301 12.594 7.36601 12.594C7.91101 12.594 8.54401 12.342 8.83101 11.996L8.91901 11.58C8.71901 11.756 8.42701 11.826 8.23301 11.826C7.95801 11.826 7.85801 11.633 7.92901 11.293L8.93001 6.58801Z" fill="#F19737"/>
        <path d="M8 5.5C8.55228 5.5 9 5.05228 9 4.5C9 3.94772 8.55228 3.5 8 3.5C7.44772 3.5 7 3.94772 7 4.5C7 5.05228 7.44772 5.5 8 5.5Z" fill="#F19737"/>
      </svg>
    </span>
  )
}


export const Plus = ({ onClick = null, fill = null, className = "clickable" }) => {
  return (
    <span onClick={onClick} className={className}>
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 7V6H6V0H7V6H13V7H7V13H6V7H0Z" fill="#F19737"/>
      </svg>
    </span>
  )
}


export const Check = ({ onClick = null, fill = null, className = "clickable" }) => {
  return (
    <span onClick={onClick} className={className} style={{marginLeft: '.2rem'}}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM15.768 9.14C15.8558 9.03964 15.9226 8.92274 15.9646 8.79617C16.0065 8.6696 16.0227 8.53591 16.0123 8.40298C16.0018 8.27005 15.9648 8.14056 15.9036 8.02213C15.8423 7.90369 15.758 7.79871 15.6555 7.71334C15.5531 7.62798 15.4346 7.56396 15.3071 7.52506C15.1796 7.48616 15.0455 7.47316 14.9129 7.48683C14.7802 7.50049 14.6517 7.54055 14.5347 7.60463C14.4178 7.66872 14.3149 7.75554 14.232 7.86L9.932 13.019L7.707 10.793C7.5184 10.6108 7.2658 10.51 7.0036 10.5123C6.7414 10.5146 6.49059 10.6198 6.30518 10.8052C6.11977 10.9906 6.0146 11.2414 6.01233 11.5036C6.01005 11.7658 6.11084 12.0184 6.293 12.207L9.293 15.207C9.39126 15.3052 9.50889 15.3818 9.63842 15.4321C9.76794 15.4823 9.9065 15.505 10.0453 15.4986C10.184 15.4923 10.32 15.4572 10.4444 15.3954C10.5688 15.3337 10.6791 15.2467 10.768 15.14L15.768 9.14Z" fill="#9DDCA4"/>
      </svg>
    </span>
  )
}


export const SubtaskCheck = ({ onClick = null, fill = null, className = "subtask__check", isCreator = false }) => {
  return (
    <span onClick={onClick} className={className}>
      <svg class="subtask__check" style={isCreator ? { cursor:'pointer' } : {} } width="16" height="16" viewBox="0 0 16 16"  fill={fill} xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8V8ZM12.03 4.97C11.9586 4.89882 11.8735 4.84277 11.7799 4.80522C11.6863 4.76766 11.5861 4.74936 11.4853 4.75141C11.3845 4.75347 11.2851 4.77583 11.1932 4.81717C11.1012 4.85851 11.0185 4.91797 10.95 4.992L7.477 9.417L5.384 7.323C5.24182 7.19052 5.05378 7.1184 4.85948 7.12183C4.66518 7.12525 4.47979 7.20397 4.34238 7.34138C4.20497 7.47879 4.12625 7.66418 4.12283 7.85848C4.1194 8.05278 4.19152 8.24083 4.324 8.383L6.97 11.03C7.04128 11.1012 7.12616 11.1572 7.21958 11.1949C7.313 11.2325 7.41305 11.2509 7.51375 11.2491C7.61444 11.2472 7.71374 11.2251 7.8057 11.184C7.89766 11.1429 7.9804 11.0837 8.049 11.01L12.041 6.02C12.1771 5.8785 12.2523 5.68928 12.2504 5.49296C12.2485 5.29664 12.1698 5.10888 12.031 4.97H12.03Z"/>
      </svg>
    </span>
  )
}


export const Cross = ({ onClick = null, fill = null, className = "clickable" }) => {
  return (
    <span onClick={onClick} className={className}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.837 3.20948C14.5472 -1.06983 7.50732 -1.06983 3.21742 3.20948C-1.07247 7.48878 -1.07247 14.5112 3.21742 18.7905C7.50732 23.0698 14.4372 23.0698 18.727 18.7905C23.0169 14.5112 23.1269 7.48878 18.837 3.20948ZM14.1072 15.6085L11.0272 12.5362L7.94731 15.6085L6.40735 14.0723L9.48727 11L6.40735 7.92768L7.94731 6.39152L11.0272 9.46384L14.1072 6.39152L15.6471 7.92768L12.5672 11L15.6471 14.0723L14.1072 15.6085Z" fill="#EE6F6F"/>
      </svg>
    </span>
  )
}


export const BasicCross = ({ onClick = null, className = "clickable" }) => {
  return (
    <span onClick={onClick} className={className}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.2937 8.17746C10.1962 8.07996 10.1962 7.92121 10.2937 7.82371L15.0625 3.05996C15.6462 2.47371 15.6462 1.52496 15.0625 0.938711C14.4787 0.352461 13.5337 0.352461 12.95 0.938711L8.17746 5.70621C8.07996 5.80371 7.92121 5.80371 7.82371 5.70621L3.06121 0.937461C2.47496 0.353711 1.52496 0.353711 0.938711 0.937461C0.352461 1.52121 0.352461 2.46621 0.938711 3.04996L5.70621 7.82121C5.80371 7.91871 5.80371 8.07746 5.70621 8.17496L0.937461 12.9387C0.353711 13.525 0.353711 14.4737 0.937461 15.06C1.52121 15.6462 2.46621 15.6462 3.04996 15.06L7.82121 10.2925C7.91871 10.195 8.07746 10.195 8.17496 10.2925L12.9387 15.0612C13.525 15.645 14.4737 15.645 15.06 15.0612C15.6462 14.4775 15.6462 13.5325 15.06 12.9487L10.2937 8.17746Z" fill="url(#paint0_linear)"/>
        <defs>
        <linearGradient id="paint0_linear" x1="7.99996" y1="0.362836" x2="7.99996" y2="15.265" gradientUnits="userSpaceOnUse">
        <stop stop-color="#FF5252"/>
        <stop offset="0.446" stop-color="#EE3030"/>
        <stop offset="1" stop-color="#D50000"/>
        </linearGradient>
        </defs>
      </svg>
    </span>
  )
}


export const DeleteIcon = ({ onClick = null, fill = null, className = "clickable"}) => {
  return (
    <span onClick={onClick} className={className}>
      <svg width="13" height="13" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM15 13.59L13.59 15L10 11.41L6.41 15L5 13.59L8.59 10L5 6.41L6.41 5L10 8.59L13.59 5L15 6.41L11.41 10L15 13.59Z" fill="#EB8B84"/>
      </svg>
    </span>
  )
}


export const TasklistActionsIcon = ({ onClick = null, fill = null, className = "clickable" }) => {
  return (
    <span onClick={onClick} className={className}>
      <svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.836182" y1="0.5" x2="13.3003" y2="0.5" stroke="white" strokeLinejoin="bevel"/>
        <line x1="0.836182" y1="4.5" x2="15.5666" y2="4.5" stroke="white" strokeLinejoin="round"/>
      </svg>
    </span>
  )
}


export const Flag = ({ onClick = null, fill = null, className = "clickable" }) => {
  return (
    <span onClick={onClick} className={className}>
      <svg x="0px" y="0px" viewBox="0 0 512 512" fill={fill}>
        <g>
          <g>
            <path d="M439.463,61.867c-4.616-2.685-10.318-2.685-14.933,0c-17.877,9.918-38.009,15.061-58.453,14.933
              c-29.891,0.661-58.793-10.715-80.213-31.573c-24.728-24.205-58.162-37.431-92.757-36.693
              c-27.861-0.241-55.101,8.232-77.909,24.235V25.6c0-14.138-11.461-25.6-25.6-25.6c-14.139,0-25.6,11.461-25.6,25.6v460.8
              c0,14.138,11.461,25.6,25.6,25.6c14.138,0,25.6-11.461,25.6-25.6V264.533c2.828-0.265,5.522-1.33,7.765-3.072
              c20.302-14.951,44.933-22.861,70.144-22.528c29.946-0.688,58.911,10.689,80.384,31.573c24.681,24.17,58.049,37.394,92.587,36.693
              c26.469,0.308,52.431-7.266,74.581-21.76c4.74-3.285,7.501-8.742,7.339-14.507V76.8C448.052,70.648,444.791,64.943,439.463,61.867
              z"/>
          </g>
        </g>
        </svg>
    </span>
  )
}


export const EditIcon = ({ onClick = null, fill = null, className = "clickable" }) => {
  return (
    <span onClick={onClick} className={className}>
      <svg x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" fill="#F19737">
        <g><path d="M874.7,433.4c-16.6,0-28.8,13.5-28.8,30V860c0,39.5-30.6,73.1-70,73.1H153c-39.5,0-85.4-33.6-85.4-73.1V235.3c0-39.6,45.9-81.8,85.4-81.8h335.4c16.6,0,30-12.3,30-28.9c0-16.6-13.4-28.9-30-28.9H153c-78.8,0-143,60.4-143,139.5V860c0,79.1,64.2,130.9,143,130.9h622.9c78.9,0,127.7-51.8,127.7-130.9V463.4C903.6,446.8,891.3,433.4,874.7,433.4L874.7,433.4L874.7,433.4z M964.1,136L862.4,34.3c-33.4-33.5-92.1-33.5-125.5,0l-83,97.7L211.8,556.1l-29.2,254.2l14.1,12.3l247.1-33.7l422.8-443.6l97.5-79.7C998.6,230.8,998.6,170.7,964.1,136L964.1,136L964.1,136z M253.1,751.7l7.2-119l109.6,109.8L253.1,751.7L253.1,751.7L253.1,751.7z M422.7,711.5L288.6,577.2l395.3-394l131.6,131.9L422.7,711.5L422.7,711.5L422.7,711.5z M922.2,220l-58.9,59L719.8,135.3l58.9-59c5.6-5.6,13-8.7,20.9-8.7c8,0,15.4,3,20.9,8.7l101.6,101.7C933.7,189.5,933.7,208.4,922.2,220L922.2,220L922.2,220z"/></g>
      </svg>
    </span>
  )
}



