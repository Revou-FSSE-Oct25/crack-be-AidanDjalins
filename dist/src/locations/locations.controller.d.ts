import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
    findAll(): Promise<{
        id: string;
        name: string;
        description: string | null;
        latitude: number;
        longitude: number;
        address: string | null;
    }[]>;
    create(createLocationDto: CreateLocationDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        latitude: number;
        longitude: number;
        address: string | null;
    }>;
    update(id: string, updateLocationDto: UpdateLocationDto): Promise<{
        id: string;
        name: string;
        description: string | null;
        latitude: number;
        longitude: number;
        address: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
