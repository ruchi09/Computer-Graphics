# ----------------------------------------------------------------------------------------------------------
#
# Program Written By: Ruchi Saha (CED15I023)
# Description: The program paints whole screen with one color. Changes the color once in three seconds
#
# ----------------------------------------------------------------------------------------------------------

import pygame



BLACK = [0, 0, 0]
WHITE = [255, 255, 255]
GREEN = [0, 255, 0]
RED = [255, 0, 0]
BLUE = [0, 0, 255]

colours = [BLACK, RED, BLUE, GREEN, WHITE]
col =0
n_col =5


if __name__ == '__main__':

        size = (700, 500)
        screen = pygame.display.set_mode(size)

        pygame.display.set_caption("Levy's C curve")

        # Loop until the user clicks the close button.
        done = False

        # Used to manage how fast the screen updates
        clock = pygame.time.Clock()

        # -------- Main Program Loop -----------
        while not done:
            # --- Main event loop
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    done = True


            #------ Code ------------------------------------------

            col = (col+1)%n_col
            screen.fill(colours[col])
            pygame.time.wait(3000)

            # --- Go ahead and update the screen with what we've drawn.
            pygame.display.flip()

            # --- Limit to 60 frames per second
            clock.tick(60)

        # Close the window and quit.
        pygame.quit()
