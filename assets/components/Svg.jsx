import React from 'react';

// Note : La span autour des SVG permet de cibler plus facilement au clic

export const Infobulle = ({onClick = null, fill = null, className = "info-bulle"}) => {
  return (
    <span onClick={onClick} className={className}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 15C9.85652 15 11.637 14.2625 12.9497 12.9497C14.2625 11.637 15 9.85652 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1C6.14348 1 4.36301 1.7375 3.05025 3.05025C1.7375 4.36301 1 6.14348 1 8C1 9.85652 1.7375 11.637 3.05025 12.9497C4.36301 14.2625 6.14348 15 8 15V15ZM8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16V16Z" fill="#F19737"/>
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
    <span onClick={onClick} className={className}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM15.768 9.14C15.8558 9.03964 15.9226 8.92274 15.9646 8.79617C16.0065 8.6696 16.0227 8.53591 16.0123 8.40298C16.0018 8.27005 15.9648 8.14056 15.9036 8.02213C15.8423 7.90369 15.758 7.79871 15.6555 7.71334C15.5531 7.62798 15.4346 7.56396 15.3071 7.52506C15.1796 7.48616 15.0455 7.47316 14.9129 7.48683C14.7802 7.50049 14.6517 7.54055 14.5347 7.60463C14.4178 7.66872 14.3149 7.75554 14.232 7.86L9.932 13.019L7.707 10.793C7.5184 10.6108 7.2658 10.51 7.0036 10.5123C6.7414 10.5146 6.49059 10.6198 6.30518 10.8052C6.11977 10.9906 6.0146 11.2414 6.01233 11.5036C6.01005 11.7658 6.11084 12.0184 6.293 12.207L9.293 15.207C9.39126 15.3052 9.50889 15.3818 9.63842 15.4321C9.76794 15.4823 9.9065 15.505 10.0453 15.4986C10.184 15.4923 10.32 15.4572 10.4444 15.3954C10.5688 15.3337 10.6791 15.2467 10.768 15.14L15.768 9.14Z" fill="#9DDCA4"/>
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


export const TasklistActionsIcon = ({ onClick = null, fill = null, className = "clickable" }) => {
  return (
    <span onClick={onClick} className={className}>
      <svg width="16" height="5" viewBox="0 0 16 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="0.836182" y1="0.5" x2="13.3003" y2="0.5" stroke="white" stroke-linejoin="bevel"/>
        <line x1="0.836182" y1="4.5" x2="15.5666" y2="4.5" stroke="white" stroke-linejoin="round"/>
      </svg>
    </span>
  )
}




