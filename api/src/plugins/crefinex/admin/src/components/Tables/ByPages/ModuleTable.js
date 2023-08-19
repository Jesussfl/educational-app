import React, { useState } from "react";
import { Box, Flex, Typography, Tbody, Tr, Td, IconButton, Link } from "@strapi/design-system";
import pluginId from "../../../pluginId";
import { ArrowRight, Trash } from "@strapi/icons";
import { DeleteDialog } from "../../Modal/Dialog/CustomDialogs";

import CustomTable from "../Table";
export function ModuleTable({ data, status, actions }) {
  let rowData = status.isLoading ? [] : data.data;
  const [lessonIdToDelete, setLessonIdToDelete] = useState(null);

  return (
    <CustomTable actions={actions} data={data} status={status}>
      <Tbody>
        {rowData.map((row) => {
          const attributes = row.attributes;

          return (
            <Tr key={row.id}>
              <Td>
                <Typography textColor="neutral800">{row.id}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.description}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.order}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.createdAt}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.updatedAt}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.publishedAt}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.lessons.data.id || ""}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{attributes.world.data?.attributes?.name || ""}</Typography>
              </Td>
              <Td>
                <Flex style={{ justifyContent: "end" }}>
                  <Link to={`/plugins/${pluginId}/lesson/${row.id}?page=1&pageSize=10&sort=id:ASC`}>
                    <IconButton label="Go to Lessons" noBorder icon={<ArrowRight />} />
                  </Link>
                  <Box paddingLeft={1}>
                    <IconButton onClick={() => setLessonIdToDelete(row.id)} label="Delete" noBorder icon={<Trash />} />
                  </Box>
                </Flex>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
      {lessonIdToDelete != null && (
        <DeleteDialog showDialog={setLessonIdToDelete} deleteAction={actions.moduleActions.deleteModule} showModal={actions.showModal} idToDelete={lessonIdToDelete} />
      )}
    </CustomTable>
  );
}
