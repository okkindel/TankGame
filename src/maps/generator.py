import pygame

FRONT = (24, 36, 55)
BACK = (44, 65, 100)
BRICK = (166, 97, 7)
WALL = (80, 76, 68)
SPAWN = (179, 108, 84)
EAGLE = (204, 212, 77)
TANK = (36, 124, 29)

# This sets the WIDTH and HEIGHT of each grid location
WIDTH = 20
HEIGHT = 20
MARGIN = 2

grid = []
for row in range(20):
    grid.append([])
    for column in range(25):
        grid[row].append(0)

map_name = input("Enter map title: ")
spawn_counter = int(input("Enter spawn points counter: "))
enemy_counter = int(input("Enter enemy counter: "))
spawn_x = int(input("Enter spawn X (12): "))
spawn_y = int(input("Enter spawn Y (15): "))
grid[spawn_y][spawn_x] = 5
eagle_x = int(input("Enter eagle X (12): "))
eagle_y = int(input("Enter eagle Y (17): "))
grid[eagle_y][eagle_x] = 4

pygame.init()
WINDOW_SIZE = [552, 472]
screen = pygame.display.set_mode(WINDOW_SIZE)
pygame.display.set_caption("Map Generator")
done = False
clock = pygame.time.Clock()

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
        elif event.type == pygame.MOUSEBUTTONDOWN:
            pos = pygame.mouse.get_pos()
            if pos[1] < 442:
                column = pos[0] // (WIDTH + MARGIN)
                row = pos[1] // (HEIGHT + MARGIN)
                # Set that location to one
                if grid[row][column] == 0:
                    grid[row][column] = 1
                elif grid[row][column] == 1:
                    grid[row][column] = 2
                elif grid[row][column] == 2:
                    grid[row][column] = 3
                elif grid[row][column] == 3:
                    grid[row][column] = 0
                print("Click ", pos, "Grid coordinates: ", row, column)
            elif 0 < pos[0] < 552 and 442 < pos[1] < 472:
                map_save();

    screen.fill(BACK)

    # Draw the grid
    for row in range(20):
        for column in range(25):
            color = FRONT
            if grid[row][column] == 1:
                color = BRICK
            if grid[row][column] == 2:
                color = WALL
            if grid[row][column] == 3:
                color = SPAWN
            if grid[row][column] == 4:
                color = EAGLE
            if grid[row][column] == 5:
                color = TANK
            pygame.draw.rect(screen, color, [(MARGIN + WIDTH) * column + MARGIN,
                                             (MARGIN + HEIGHT) * row + MARGIN, WIDTH, HEIGHT])

    pygame.draw.rect(screen, FRONT, [2, 444, 548, 26])
    label = pygame.font.SysFont("monospace", 15).render("GENERATE", 1, (255, 255, 255))
    screen.blit(label, (240, 450))


    def map_save():

        r = open('map_list.json')
        lines = r.readlines()
        r.close()
        f = open('map_list.json', 'w')
        f.writelines([item for item in lines[:-2]])
        f.write(",\n")
        f.write('"' + str(map_name) + '"')
        f.write(']' + '\n')
        f.write('}' + '\n')
        f.close()

        spawn_checker = 0

        f = open(map_name + '.json', 'w')
        f.write('{' + '\n')
        f.write('"start_point": {' + '\n')
        f.write('"x": ' + str(spawn_x) + ',\n')
        f.write('"y": ' + str(spawn_y) + '\n')
        f.write('},' + '\n')
        f.write('"enemy_spawn": [' + '\n')
        for x in range(0, 25):
            for y in range(0, 20):
                if grid[y][x] == 3:
                    spawn_checker += 1
                    f.write('{\n')
                    f.write('"x": ' + str(x) + ',\n')
                    f.write('"y": ' + str(y) + '\n')
                    f.write("}\n")
                    f.write(",\n")
        f.close()
        r = open(map_name + '.json')
        lines = r.readlines()
        r.close()
        f = open(map_name + '.json', 'w')
        f.writelines([item for item in lines[:-1]])
        f.write('],' + '\n')
        f.write('"spawn_counter": ' + str(spawn_counter) + ',\n')
        f.write('"enemy_counter": ' + str(enemy_counter) + ',\n')
        f.write('"eagle": {' + '\n')
        f.write('"x": ' + str(eagle_x) + ',\n')
        f.write('"y": ' + str(eagle_y) + '\n')
        f.write('},' + '\n')
        f.write('"brick": [' + '\n')
        for x in range(0, 25):
            for y in range(0, 20):
                if grid[y][x] == 1:
                    f.write('{\n')
                    f.write('"x": ' + str(x) + ',\n')
                    f.write('"y": ' + str(y) + '\n')
                    f.write("}\n")
                    f.write(",\n")
        f.close()
        r = open(map_name + '.json')
        lines = r.readlines()
        r.close()
        f = open(map_name + '.json', 'w')
        f.writelines([item for item in lines[:-1]])
        f.write('],' + '\n')
        f.write('"walls": [' + '\n')
        for x in range(0, 25):
            for y in range(0, 20):
                if grid[y][x] == 2:
                    f.write('{\n')
                    f.write('"x": ' + str(x) + ',\n')
                    f.write('"y": ' + str(y) + '\n')
                    f.write("}\n")
                    f.write(",\n")
        f.close()
        r = open(map_name + '.json')
        lines = r.readlines()
        r.close()
        f = open(map_name + '.json', 'w')
        f.writelines([item for item in lines[:-1]])
        f.write(']' + '\n')
        f.write('}' + '\n')
        f.close()
        if spawn_checker != spawn_counter:
            print("THERE IS ERROR, TOO MUCH OR TO LESS SPAWN POINTS!")
        print("MAP EXPORTED")
        pass


    clock.tick(60)
    pygame.display.flip()

pygame.quit()
