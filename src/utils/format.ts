import { acceptedQueryParams } from "src/interfaces/reforestation-projects.interfaces";

export function formatQuery(query: acceptedQueryParams) {
    const { propertyType, resolution, status, minimumDesignatedPlantingAreaInMeters, maximumDesignatedPlantingAreaInMeters } = query

    const whereClause = {}
    if (propertyType) whereClause['propertyType'] = propertyType
    if (resolution) whereClause['resolution'] = resolution
    if (status) whereClause['status'] = status

    if (minimumDesignatedPlantingAreaInMeters) {
        whereClause['designatedPlantingAreaInMeters'] = { ...whereClause['designatedPlantingAreaInMeters'], $gte: parseInt(minimumDesignatedPlantingAreaInMeters) }
    }
    if (maximumDesignatedPlantingAreaInMeters) {
        whereClause['designatedPlantingAreaInMeters'] = { ...whereClause['designatedPlantingAreaInMeters'], $lte: parseInt(maximumDesignatedPlantingAreaInMeters) }
    }

    return whereClause
}