import { FC, ReactNode } from "react";
import { Box, Container } from "@mui/material";

import NavBar from "./NavBar";

type DefaultLayoutProps = {
  children: ReactNode;
};
export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Box padding={{ xs: 0, sm: 2, md: 4 }} paddingTop={{ xs: 4 }}>
          {children}
        </Box>
      </Container>
    </>
  );
};
