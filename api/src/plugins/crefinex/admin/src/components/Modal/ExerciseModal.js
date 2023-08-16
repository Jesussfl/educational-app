import React, { useState } from "react";

import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
  Combobox,
  ComboboxOption,
  CreatableCombobox,
} from "@strapi/design-system";
import submitHandlers from "./utils/handlers";
export default function ExerciseModal({ setShowModal, addModule, worldData }) {
  const [description, setDescription] = useState("");
  const [world, setWorld] = useState();
  const getError = () => {
    // Form validation error

    if (description.length > 40) {
      return "Content is too long";
    }

    return null;
  };

  return (
    <ModalLayout
      onClose={() => setShowModal(false)}
      labelledBy="title"
      as="form"
      onSubmit={(e, description, world) => submitHandlers.createModule}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          Add a module
        </Typography>
      </ModalHeader>

      <ModalBody>
        <TextInput
          placeholder="Add a description here"
          label="Description"
          name="description"
          hint="Max 40 characters"
          error={getError()}
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
        <Combobox
          placeholder="Select the world of this module"
          label="World"
          value={world}
          onChange={setWorld}
          onClear={() => setWorld("")}
        >
          {worldData.map((world) => (
            <ComboboxOption
              key={world.id}
              value={world.id}
            >{`${world.id} - ${world.attributes.name}`}</ComboboxOption>
          ))}
        </Combobox>
        ;
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => setShowModal(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endActions={<Button type="submit">Add Module</Button>}
      />
    </ModalLayout>
  );
}
