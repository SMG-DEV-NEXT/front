"use client";
import React from "react";
import AdminTitle from "../Title";
import AdminButton from "../button";

const AdminPageHeader = ({
  route,
  buttonText,
  buttonOnClick,
  settingsRoute,
  isDisabledButton,
  isHaveMultipleDeleteButton,
  onDelete,
}) => {
  return (
    <div className="flex justify-between w-full">
      <AdminTitle route={route} settingsRoute={settingsRoute} />
      <div className="flex gap-2">
        {isHaveMultipleDeleteButton && (
          <AdminButton
            isDelete={true}
            disabled={isDisabledButton}
            onClick={onDelete}
          >
            deleteSelected
          </AdminButton>
        )}
        {buttonText && (
          <AdminButton disabled={isDisabledButton} onClick={buttonOnClick}>
            {buttonText}
          </AdminButton>
        )}
      </div>
    </div>
  );
};

export default AdminPageHeader;
