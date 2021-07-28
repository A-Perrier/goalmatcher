import React from 'react';

export const UserIcon = ({ user = undefined, className = "assignee-profile-picture" }) => 
  <img src={user.pictureProjectPathName} className={className} title={user.pseudo} />

export const DefaultUser = ({ className = "" }) => 
  <img src="/assets/icons/user.svg" className={className} title=""/>