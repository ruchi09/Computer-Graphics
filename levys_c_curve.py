
import pygame
import thread
import math


R = 0
G = 1
B = 2
width = 50
height = 30
block_width=10
block_height=10
#
# width = 400
# height = 300
# block_width=2
# block_height=2


# Define some colors
BLACK = [0, 0, 0]
WHITE = [255, 255, 255]
GREEN = [0, 255, 0]
RED = [255, 0, 0]
BLUE = [0, 0, 255]

colours = [BLACK, RED, BLUE, GREEN, WHITE]

pygame.init()




def c_curve(x,y,l,alpha,n,color,delay):
    if(n>1):
        l=l*0.707
        c_curve(x,y,l,alpha+45,n-1,color,delay)
        x=math.ceil(x+l*math.cos(math.radians(alpha+45)))
        y=math.ceil(y+l*math.sin(math.radians(alpha+45)))
        c_curve(x,y,l,alpha-45,n-1,color,delay)
    else:
        pygame.draw.line(screen,colours[color],(int(x),int(y)),(x+l*math.cos(math.radians(alpha)),y+l*math.sin(math.radians(alpha))),1)
        pygame.display.flip()
        pygame.time.wait(delay)




if __name__ == '__main__':

        size = (700, 500)
        screen = pygame.display.set_mode(size)

        pygame.display.set_caption("Levy's C curve")

        # Loop until the user clicks the close button.
        done = False

        font = pygame.font.SysFont("comicsansms", 30)



        # Used to manage how fast the screen updates
        clock = pygame.time.Clock()

        # -------- Main Program Loop -----------
        while not done:
            # --- Main event loop
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    done = True


            #------ Code ------------------------------------------
            x1 =300
            y1 = 100
            x2 = 550
            y2 = 150
            pygame.draw.line(screen,(150,150,53),(x1,y1),(x2,y2),1)
            l = math.hypot(x2 - x1, y2 - y1)
            a = (y2-y1)*1.0/(x2-x1)
            alpha = math.degrees(math.atan(a))
            print a
            print math.tan(a)
            print alpha

            #screen.fill((255, 255, 255))


            for i in range(2,10):
                n="N = "+ str(i-3)
                text = font.render(n, True, (0, 0, 0))
                screen.blit(text, (50, 380))

                n="N = "+ str(i-2)
                text = font.render(n, True, colours[((i-1)% (len(colours)-1))+1])
                screen.blit(text, (50, 380))
                c_curve(x1,y1,l,alpha,i,((i-1)% (len(colours)-1))+1, 200-i*20  )
                c_curve(x1,y1,l,alpha,i-1,0,0)



            # --- Go ahead and update the screen with what we've drawn.
            pygame.display.flip()
            # --- Limit to 60 frames per second
            clock.tick(60)
            pygame.time.wait(10000)
            pygame.quit()
        # Close the window and quit.
        pygame.quit()
