"use client";

import SvgIcon from "@/components/SvgIcon";
import { IAccountDetail, IUser, } from "@/lib/Interfaces";
import { accountDetailCreateMut, accountDetailCreateMutVariables, accountDetailsQuery, accountDetailUpdateMut, accountDetailUpdateMutVariables } from "@/queries/accountDetails";
import { changePasswordMut, changePasswordMutVariables } from "@/queries/changePassword";
import { delFromLocalStorage, toLocalStorage } from "@/utils/utils";
import { useMutation, useLazyQuery } from "@apollo/client";
import { Button, TextInput } from "@mantine/core";
import { matchesField, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect, useState } from "react";

export default function AccountDetailsPage() {
  const [shown, viewPassword] = useState(false);
  
  const [getInitialData, { data: dbData, error: dbDataError, loading: initLoading }] = useLazyQuery<{accountDetail: IAccountDetail}>(
    accountDetailsQuery,
    {
      errorPolicy: "all",
    }
  );
  //console.log(dbData);
  //console.log(error?.message);

  // form data
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      tel: "",
      userName: "",
      currentPassword: "",
      password: "",
      passwordConfirmation: "",
    },
    validate: {
      email: (value:string) => (value && value.trim().length > 0 ? (/^\S+@\S+$/.test(value) ? null: "Invalid email") : null),
      currentPassword: (value, values) => {
        if(value?.trim().length == 0 && (values.password?.trim().length > 0 || values.passwordConfirmation?.trim().length > 0)) {
          return "Must not be empty";
        }
        return null;
      },
      password: (value, values) => {
        if(value?.trim().length == 0 && (values.currentPassword?.trim().length > 0 || values.passwordConfirmation?.trim().length > 0)) {
          return "Must not be empty";
        }
        if(value && value.trim().length > 0 && value.trim().length < 8) {
          return "Must be at least 8 characters";
        }
        return null;
      },
      passwordConfirmation: matchesField("password", "Passwords are not the same"),
    },
  });

  // mutation of creating record
  const [
    detailCreateMut,
    {
      data: createdData,
      loading: createLoading,
      error: createError,
    },
  ] = useMutation<{
    createAccountDetail: IAccountDetail;
  }>(accountDetailCreateMut, {onCompleted: onCreateData});

  // mutation of updating record
  const [
    detailUpdateMut,
    {
      data: updatedData,
      loading: updateLoading,
      error: updateError,
    },
  ] = useMutation<{
    updateAccountDetail: IAccountDetail;
  }>(accountDetailUpdateMut, {onCompleted: onUpdateData});

  // mutation for change password
  const [
    changePassMut,
    {
      data: userData,
      error: changePasswordError,
    },
  ] = useMutation<{changePassword: IUser}>(changePasswordMut, {onCompleted: onChangePassword});


  // show notification when data change
  function onCreateData() {
    notifications.show({
      message: "Data was saved",
      color: "green",
    });
  }

  // show notification when data change
  function onUpdateData() {
    notifications.show({
      message: "Data was changed",
      color: "green",
    });
  }

  // save jwt and show notofication
  function onChangePassword(data: {changePassword: IUser})  {
    if(data && data.changePassword && data.changePassword.jwt) {
      toLocalStorage<IUser>("user", data.changePassword);
      notifications.show({
        message: "Password was changed",
        color: "green",
      });
    }
  };

  // on submit
  const handleCreateOrUpdateRecord = (values: typeof form.values) => {
    // update record
    if(dbData && dbData.accountDetail.documentId || createdData && createdData?.createAccountDetail?.documentId) {
      detailUpdateMut({
        variables: accountDetailUpdateMutVariables(dbData?.accountDetail?.documentId || createdData?.createAccountDetail?.documentId || "", values)
      });
    }
    // create record
    if(dbData && !dbData.accountDetail.documentId && !createdData?.createAccountDetail?.documentId) {
      detailCreateMut({
        variables: accountDetailCreateMutVariables(values),
      });
    }
    // change password
    if(values.currentPassword != "" && values.password != "" && values.passwordConfirmation != "") {
      changePassMut({
        variables: changePasswordMutVariables(values.currentPassword, values.password, values.passwordConfirmation)
      });
    }
  };

  // set fields from initial data
  useEffect(() => {
    if(dbData) {
      form.setValues(dbData.accountDetail);
    }
  }, [dbData]);

  // change user token
  /* useEffect(() => {
    if(userData && userData.changePassword && userData.changePassword.jwt) {
      toLocalStorage<IUser>("user", userData.changePassword);
    }
  }, [userData]); */

  // get record from db
  useEffect(() => {
    getInitialData();
  }, []);

  // if error was set
  useEffect(() => {
    if (dbDataError && dbDataError.message == "Forbidden access") {
      delFromLocalStorage("user");
    }
    if (dbDataError) {
      notifications.show({
        message: dbDataError.message,
        color: "red",
      });
    }
  }, [dbDataError]);

  // if error was set
  useEffect(() => {
    if (updateError && updateError.message == "Forbidden access") {
      delFromLocalStorage("user");
    }
    if (updateError) {
      notifications.show({
        message: updateError.message,
        color: "red",
      });
    }
  }, [updateError]);

  // if error was set
  useEffect(() => {
    if (changePasswordError && changePasswordError.message == "Forbidden access") {
      delFromLocalStorage("user");
    }
    if (changePasswordError) {
      notifications.show({
        message: "Password is not changed",
        color: "red",
      });
    }
  }, [changePasswordError]);

  // if error was set
  useEffect(() => {
    if (createError && createError.message == "Forbidden access") {
      delFromLocalStorage("user");
    }
    if (createError) {
      notifications.show({
        message: createError.message,
        color: "red",
      });
    }
  }, [createError]);

  return (
    <div>
      <h4 className="font-medium text-[16px] leading-16">
        Personal information
      </h4>
      <form
        className="mt-14"
        onSubmit={form.onSubmit(handleCreateOrUpdateRecord)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
          <TextInput
            label="First Name"
            key={form.key("firstName")}
            {...form.getInputProps("firstName")}
            classNames={{
              input:
                "rounded-[3px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
              root: "md:w-full",
              label: "font-normal text-[15px] leading-15 text-tuatara",
            }}
          />
          <TextInput
            label="Last Name"
            key={form.key("lastName")}
            {...form.getInputProps("lastName")}
            classNames={{
              input:
                "rounded-[3px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
              root: "md:w-full",
              label: "font-normal text-[15px] leading-15 text-tuatara",
            }}
          />
          <TextInput
            label="Email address"
            key={form.key("email")}
            {...form.getInputProps("email")}
            classNames={{
              input:
                "rounded-[3px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
              root: "md:w-full",
              label: "font-normal text-[15px] leading-15 text-tuatara",
            }}
          />
          <TextInput
            label="Phone Number"
            key={form.key("tel")}
            {...form.getInputProps("tel")}
            classNames={{
              input:
                "rounded-[3px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
              root: "md:w-full",
              label: "font-normal text-[15px] leading-15 text-tuatara",
            }}
          />
          <TextInput
            label="Username"
            key={form.key("userName")}
            {...form.getInputProps("userName")}
            classNames={{
              input:
                "rounded-[3px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
              root: "md:w-full",
              label: "font-normal text-[15px] leading-15 text-tuatara",
            }}
          />
        </div>
        <h4 className="mt-37 font-medium text-[16px] leading-16">
          Password change
        </h4>
        <div className="flex flex-col gap-30">
          <TextInput
            label="Current password"
            type={shown ? "text" : "password"}
            key={form.key("currentPassword")}
            {...form.getInputProps("currentPassword")}
            classNames={{
              input:
                "rounded-[3px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
              root: "md:max-w-417 mt-20",
              label: "font-normal text-[15px] leading-15 text-tuatara",
            }}
            rightSection={
              shown ? (
                <div onClick={() => viewPassword(!shown)}>
                  <SvgIcon iconName="show" className="size-20 text-dove-gray" />
                </div>
              ) : (
                <div onClick={() => viewPassword(!shown)}>
                  <SvgIcon iconName="hide" className="size-20 text-dove-gray" />
                </div>
              )
            }
          />
          <TextInput
            label="New password"
            type={shown ? "text" : "password"}
            key={form.key("password")}
            {...form.getInputProps("password")}
            classNames={{
              input:
                "rounded-[3px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
              root: "md:max-w-417",
              label: "font-normal text-[15px] leading-15 text-tuatara",
            }}
            rightSection={
              shown ? (
                <div onClick={() => viewPassword(!shown)}>
                  <SvgIcon iconName="show" className="size-20 text-dove-gray" />
                </div>
              ) : (
                <div onClick={() => viewPassword(!shown)}>
                  <SvgIcon iconName="hide" className="size-20 text-dove-gray" />
                </div>
              )
            }
          />
          <TextInput
            label="Confirm new password"
            type={shown ? "text" : "password"}
            key={form.key("passwordConfirmation")}
            {...form.getInputProps("passwordConfirmation")}
            classNames={{
              input:
                "rounded-[3px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
              root: "md:max-w-417",
              label: "font-normal text-[15px] leading-15 text-tuatara",
            }}
            rightSection={
              shown ? (
                <div onClick={() => viewPassword(!shown)}>
                  <SvgIcon iconName="show" className="size-20 text-dove-gray" />
                </div>
              ) : (
                <div onClick={() => viewPassword(!shown)}>
                  <SvgIcon iconName="hide" className="size-20 text-dove-gray" />
                </div>
              )
            }
          />
        </div>
        <Button
          type="submit"
          loading={createLoading || updateLoading || initLoading}
          classNames={{
            root: "mt-27 bg-chateau-green hover:bg-chateau-green-600 text-white font-medium text-[16px] leading-16 rounded-[5px] min-h-45 w-full md:w-auto",
          }}
        >
          Save Change
        </Button>
      </form>
    </div>
  );
}
