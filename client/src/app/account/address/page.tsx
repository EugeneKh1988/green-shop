"use client";

import { IAccountAddress, } from "@/lib/Interfaces";
import { accountAddressCreateMut, accountAddressCreateMutVariables, accountAddressQuery, accountAddressUpdateMut, accountAddressUpdateMutVariables } from "@/queries/accountAddress";
import { delFromLocalStorage } from "@/utils/utils";
import { useMutation, useLazyQuery } from "@apollo/client";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useEffect } from "react";

export default function AccountDetailsPage() {
  
  const [getInitialData, { data: dbData, error: dbDataError, loading: initLoading, refetch }] = useLazyQuery<{accountAddress: IAccountAddress}>(
    accountAddressQuery,
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
      town: "",
      street: "",
      appartment: "",
      zip: "",
    },
    validate: {},
  });

  // mutation of creating record
  const [
    addressCreateMut,
    {
      data: createdData,
      loading: createLoading,
      error: createError,
    },
  ] = useMutation<{
    createAccountAddress: IAccountAddress;
  }>(accountAddressCreateMut, {onCompleted: onCreateData});

  // mutation of updating record
  const [
    addressUpdateMut,
    {
      data: updatedData,
      loading: updateLoading,
      error: updateError,
    },
  ] = useMutation<{
    updateAccountAddress: IAccountAddress;
  }>(accountAddressUpdateMut, {onCompleted: onUpdateData});


  // show notification when data change
  function onCreateData() {
    notifications.show({
      message: "Data was saved",
      color: "green",
    });
    // get created data from db
    refetch();
  }

  // show notification when data change
  function onUpdateData() {
    notifications.show({
      message: "Data was changed",
      color: "green",
    });
    // get updated data from db
    refetch();
  }

  // on submit
  const handleCreateOrUpdateRecord = (values: typeof form.values) => {
    // update record
    if(dbData && dbData.accountAddress.documentId || createdData && createdData?.createAccountAddress?.documentId) {
      addressUpdateMut({
        variables: accountAddressUpdateMutVariables(dbData?.accountAddress?.documentId || createdData?.createAccountAddress?.documentId || "", values)
      });
    }
    // create record
    if(dbData && !dbData.accountAddress.documentId && !createdData?.createAccountAddress?.documentId) {
      addressCreateMut({
        variables: accountAddressCreateMutVariables(values),
      });
    }
  };

  // set fields from initial data
  useEffect(() => {
    if(dbData) {
      form.setValues(dbData.accountAddress);
    }
  }, [dbData]);


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
      <h4 className="font-medium text-[16px] leading-16">Address</h4>
      <form
        className="mt-14"
        onSubmit={form.onSubmit(handleCreateOrUpdateRecord)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
          <TextInput
            label="Town/City"
            key={form.key("town")}
            {...form.getInputProps("town")}
            classNames={{
              input:
                "rounded-[3px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
              root: "md:w-full",
              label: "font-normal text-[15px] leading-15 text-tuatara",
            }}
          />
          <TextInput
            label="Street Address"
            placeholder="House number and street name"
            key={form.key("street")}
            {...form.getInputProps("street")}
            classNames={{
              input:
                "rounded-[3px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
              root: "md:w-full",
              label: "font-normal text-[15px] leading-15 text-tuatara",
            }}
          />
          <TextInput
            label="Appartment"
            key={form.key("appartment")}
            {...form.getInputProps("appartment")}
            placeholder="Appartment, suite, unit, etc. (optional)"
            classNames={{
              input:
                "rounded-[3px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
              root: "md:w-full",
              label: "font-normal text-[15px] leading-15 text-tuatara",
            }}
          />
          <TextInput
            label="Zip"
            key={form.key("zip")}
            {...form.getInputProps("zip")}
            classNames={{
              input:
                "rounded-[3px] border-[#EAEAEA] placeholder:text-[#A5A5A5] focus:border-chateau-green",
              root: "md:w-full",
              label: "font-normal text-[15px] leading-15 text-tuatara",
            }}
          />
        </div>
        <Button
          type="submit"
          loading={createLoading || updateLoading || initLoading}
          classNames={{
            root: "mt-27 bg-chateau-green hover:bg-chateau-green-600 text-white font-medium text-[16px] leading-16 rounded-[5px] min-h-45 w-full md:w-auto",
          }}
        >
          Save Address
        </Button>
      </form>
    </div>
  );
}
